#!/usr/bin/env node
// scripts/translate-properties.mjs
//
// Traduce al catalán el título, la descripción y las características de las
// propiedades de Hygraph (contenido en castellano, locale "en") y lo guarda en
// el locale "ca". Después publica solo la versión catalana.
//
// Uso:
//   node scripts/translate-properties.mjs --dry-run          # traduce y muestra, NO guarda
//   node scripts/translate-properties.mjs                    # traduce y guarda las que no tengan catalán
//   node scripts/translate-properties.mjs --id <id>          # solo una propiedad
//   node scripts/translate-properties.mjs --force            # retraduce aunque ya tengan catalán
//
// Variables de entorno (en .env o .env.local, nunca en el repo):
//   VITE_HYGRAPH_ENDPOINT     endpoint de contenido (ya existe)
//   HYGRAPH_MUTATION_ENDPOINT opcional: endpoint para escribir, si no es el mismo
//   HYGRAPH_WRITE_TOKEN       Permanent Auth Token con permiso de lectura, escritura y publicación
//   ANTHROPIC_API_KEY         clave de la API de Claude (o sesión de `ant auth login`)

import "dotenv/config";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";

dotenv.config({ path: ".env.local", override: false });

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");
const ONLY_ID = args.includes("--id") ? args[args.indexOf("--id") + 1] : null;

const READ_ENDPOINT = process.env.VITE_HYGRAPH_ENDPOINT;
const WRITE_ENDPOINT = process.env.HYGRAPH_MUTATION_ENDPOINT || READ_ENDPOINT;
const TOKEN = process.env.HYGRAPH_WRITE_TOKEN;

if (!READ_ENDPOINT) throw new Error("Falta VITE_HYGRAPH_ENDPOINT");
if (!TOKEN && !DRY_RUN) throw new Error("Falta HYGRAPH_WRITE_TOKEN (o usa --dry-run)");

const MODEL = "claude-opus-5-5";
const anthropic = new Anthropic();

// --- Hygraph -----------------------------------------------------------------

const gql = async (endpoint, query, variables = {}) => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (body.errors) throw new Error(JSON.stringify(body.errors, null, 2));
  return body.data;
};

const LIST_QUERY = `
  query Properties($where: PropertyWhereInput) {
    properties(first: 200, where: $where, stage: PUBLISHED, locales: [en]) {
      id
      reference
      title
      features
      description { raw }
      localizations(locales: [ca], includeCurrent: false) { locale title }
    }
  }
`;

const UPSERT_CA = `
  mutation UpsertCa(
    $id: ID!
    $create: PropertyCreateLocalizationDataInput!
    $update: PropertyUpdateLocalizationDataInput!
  ) {
    updateProperty(
      where: { id: $id }
      data: { localizations: { upsert: [{ locale: ca, create: $create, update: $update }] } }
    ) { id }
  }
`;

const PUBLISH_CA = `
  mutation PublishCa($id: ID!) {
    publishProperty(
      where: { id: $id }
      locales: [ca]
      publishBase: false
      withDefaultLocale: false
      to: PUBLISHED
    ) { id }
  }
`;

// --- Texto enriquecido: sacar y volver a meter las hojas de texto -----------

const collectTextLeaves = (node, out = []) => {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    node.forEach((n) => collectTextLeaves(n, out));
    return out;
  }
  if (typeof node.text === "string") out.push(node);
  if (node.children) collectTextLeaves(node.children, out);
  return out;
};

// Traducimos el texto sin los espacios de los extremos y los recolocamos,
// porque en rich text los espacios entre hojas (negritas, enlaces) importan.
const splitWhitespace = (s) => {
  const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
  return { lead: m[1], core: m[2], trail: m[3] };
};

// --- Claude --------------------------------------------------------------------

const TranslationSchema = z.object({ translations: z.array(z.string()) });

const SYSTEM = `Eres traductor profesional de castellano a catalán para una agencia inmobiliaria de Barcelona (Rue Homes).
Traduce cada texto al catalán estándar, natural y comercial, como lo escribiría un agente inmobiliario catalán.
Reglas:
- Devuelve exactamente un texto traducido por cada texto de entrada, en el mismo orden.
- Conserva números, precios, superficies, referencias, porcentajes, emojis y la puntuación final.
- No traduzcas nombres propios de calles, barrios, urbanizaciones ni marcas; sí el tipo de vía ("Calle" -> "Carrer").
- No añadas ni quites información, ni comillas, ni explicaciones.
- Si un texto ya está en catalán o no tiene nada que traducir, devuélvelo igual.`;

const translateBatch = async (texts) => {
  if (texts.length === 0) return [];
  const response = await anthropic.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    output_config: { effort: "low", format: zodOutputFormat(TranslationSchema) },
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: `Traduce al catalán estos ${texts.length} textos (array JSON):\n${JSON.stringify(texts)}`,
      },
    ],
  });
  if (response.stop_reason === "refusal") {
    throw new Error(`Claude ha rechazado la traducción: ${response.stop_details?.explanation}`);
  }
  if (response.stop_reason === "max_tokens") throw new Error("Respuesta cortada (max_tokens)");
  const out = response.parsed_output?.translations;
  if (!out || out.length !== texts.length) {
    throw new Error(`Esperaba ${texts.length} traducciones y llegaron ${out?.length ?? 0}`);
  }
  return out;
};

const translateProperty = async (p) => {
  const json = structuredClone(p.description?.raw ?? { children: [] });
  const leaves = collectTextLeaves(json).filter((leaf) => leaf.text.trim());
  const parts = leaves.map((leaf) => splitWhitespace(leaf.text));
  const features = p.features ?? [];

  const inputs = [p.title, ...features, ...parts.map((x) => x.core)];
  const out = await translateBatch(inputs);

  const title = out[0];
  const featuresCa = out.slice(1, 1 + features.length);
  out.slice(1 + features.length).forEach((text, i) => {
    leaves[i].text = parts[i].lead + text + parts[i].trail;
  });

  return { title, features: featuresCa, description: json };
};

// --- Main --------------------------------------------------------------------

const main = async () => {
  const where = ONLY_ID ? { id: ONLY_ID } : undefined;
  const { properties } = await gql(READ_ENDPOINT, LIST_QUERY, { where });
  const pending = properties.filter((p) => FORCE || p.localizations.length === 0);

  console.log(
    `${properties.length} propiedades publicadas · ${pending.length} por traducir` +
      (DRY_RUN ? " · MODO PRUEBA (no se guarda nada)" : "")
  );

  let ok = 0;
  const failed = [];
  for (const p of pending) {
    const label = `${p.reference ?? p.id} · ${p.title}`;
    try {
      const ca = await translateProperty(p);
      if (DRY_RUN) {
        console.log(`\n=== ${label}\nCA título: ${ca.title}\nCA características: ${ca.features.join(" | ")}`);
        console.log(
          "CA descripción:",
          collectTextLeaves(ca.description).map((l) => l.text).join("").slice(0, 400) + "…"
        );
      } else {
        await gql(WRITE_ENDPOINT, UPSERT_CA, { id: p.id, create: ca, update: ca });
        await gql(WRITE_ENDPOINT, PUBLISH_CA, { id: p.id });
        console.log(`✓ ${label}`);
      }
      ok++;
    } catch (error) {
      console.error(`✗ ${label}\n  ${error.message}`);
      failed.push(label);
    }
  }

  console.log(`\nHecho: ${ok} correctas, ${failed.length} con error.`);
  if (failed.length) process.exitCode = 1;
};

main();

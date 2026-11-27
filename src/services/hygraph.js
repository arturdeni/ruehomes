// src/services/hygraph.js
import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT;
const token = import.meta.env.VITE_HYGRAPH_TOKEN;

if (!endpoint) {
  throw new Error("VITE_HYGRAPH_ENDPOINT environment variable is required");
}

// Configure headers only if token exists
const headers = token ? { Authorization: `Bearer ${token}` } : {};

export const hygraph = new GraphQLClient(endpoint, {
  headers,
});

// Queries para propiedades - Updated to match Hygraph schema
// Query de listado: solo los campos que usa la tarjeta, el filtrado y la ordenación.
// Para el detalle completo se usa GET_PROPERTY_BY_ID.
export const GET_PROPERTIES = `
  query GetProperties(
    $first: Int = 100
    $skip: Int = 0
    $where: PropertyWhereInput
    $orderBy: PropertyOrderByInput = createdAt_DESC
    $locales: [Locale!]! = [en]
  ) {
    properties(
      first: $first
      skip: $skip
      where: $where
      orderBy: $orderBy
      locales: $locales
    ) {
      id
      title
      price
      propertyType
      propertyStatus
      bedrooms
      bathrooms
      area
      address
      city
      images(first: 1) {
        id
        url
      }
      imageRefs: images(first: 50) {
        id
      }
    }
    propertiesConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_PROPERTY_BY_ID = `
  query GetPropertyById($id: ID!, $locales: [Locale!]! = [en]) {
    property(where: { id: $id }, locales: $locales) {
      id
      title
      description {
        html
        text
      }
      price
      propertyType
      propertyStatus
      bedrooms
      bathrooms
      area
      address
      city
      reference
      coordinates {
        latitude
        longitude
      }
      images(first: 50) {
        id
        url
        fileName
        width
        height
      }
      features
      energyRating
      energyConsumptionRating
      energyConsumptionValue
      emissionsRating
      emissionsValue
      habitabilityCertificate
      yearBuilt
      createdAt
      updatedAt
    }
  }
`;

export const GET_FEATURED_PROPERTIES = `
  query GetFeaturedProperties($first: Int = 6) {
    properties(first: $first, orderBy: createdAt_DESC) {
      id
      title
      description {
        text
      }
      price
      propertyType
      propertyStatus
      bedrooms
      bathrooms
      area
      address
      city
      reference
      images(first: 1) {
        id
        url
        fileName
      }
      features
    }
  }
`;

// Idioma del contenido en Hygraph. El castellano está guardado en el locale
// por defecto ("en"); el catalán en "ca". Pedimos [ca, en] para que, si una
// propiedad aún no tiene traducción, Hygraph devuelva el castellano.
const localesFor = (lang) => (lang === "ca" ? ["ca", "en"] : ["en"]);

// Si el locale "ca" aún no existe en Hygraph la consulta falla: en ese caso
// repetimos en castellano para que la web nunca se quede sin propiedades.
const requestLocalized = async (query, variables, lang) => {
  try {
    return await hygraph.request(query, { ...variables, locales: localesFor(lang) });
  } catch (error) {
    if (lang !== "ca") throw error;
    console.warn("Contenido en catalán no disponible, se muestra en castellano:", error);
    return hygraph.request(query, { ...variables, locales: ["en"] });
  }
};

// Funciones para hacer las queries
export const getProperties = async (variables = {}, lang = "es") => {
  try {
    const data = await requestLocalized(GET_PROPERTIES, variables, lang);
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const getPropertyById = async (id, lang = "es") => {
  try {
    const data = await requestLocalized(GET_PROPERTY_BY_ID, { id }, lang);
    return data.property;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
};

export const getFeaturedProperties = async (first = 6) => {
  try {
    const data = await hygraph.request(GET_FEATURED_PROPERTIES, { first });
    return data.properties;
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    throw error;
  }
};

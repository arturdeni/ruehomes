// src/i18n/legalCa.js
// Versió catalana dels textos legals del modal del peu de pàgina.
// Les claus coincideixen amb les de legalContent a LegalModal.jsx.

const registreMercantil = `
      <p>
        <strong>Registre Mercantil:</strong> El titular d'aquest lloc web està inscrit al Registre Mercantil de Barcelona de conformitat amb el que preveuen l'article 18 del Codi de Comerç i l'article 6 del Reglament del Registre Mercantil, en haver quedat INSCRITA l'escriptura notarial de canvi de denominació, ampliació d'objecte i modificació dels articles 1r i 2n dels estatuts socials, al TOM/I.R.U.S. 1000381757155, FOLI 1, FULL B 576887, INSCRIPCIÓ 4.
      </p>`;

const legalCa = {
  "Política de Privacidad": {
    title: "Política de Privacitat",
    content: `
      <h3>1. Responsable del Tractament</h3>
      <p>
        RUE HOMES REAL ESTATE S.L., amb NIF B09832320 i domicili a la Rambla de Catalunya, 79, entresòl 2a - Barcelona (08007),
        és la responsable del tractament de les dades personals que ens facilitis a través d'aquest web.
      </p>
      ${registreMercantil}

      <h3>2. Dades que Recollim</h3>
      <p>
        Recollim les dades personals següents quan utilitzes els nostres serveis:
      </p>
      <ul>
        <li>Nom i cognoms</li>
        <li>Adreça de correu electrònic</li>
        <li>Número de telèfon</li>
        <li>ID d'usuari de xarxes socials (quan interactues amb nosaltres a través d'aquestes plataformes)</li>
        <li>Informació sobre propietats d'interès</li>
      </ul>
      <p>
        <strong>Ús de l'API de Meta:</strong> Aquesta aplicació, propietat de RUE HOMES REAL ESTATE S.L.,
        utilitza les dades de l'API de Meta per gestionar comentaris i missatges del compte de Rue Homes
        amb finalitats d'atenció al client. No compartim dades amb tercers.
      </p>

      <h3>3. Finalitat del Tractament</h3>
      <p>
        Utilitzem les teves dades personals per:
      </p>
      <ul>
        <li>Gestionar consultes i sol·licituds d'informació</li>
        <li>Prestar serveis immobiliaris</li>
        <li>Enviar comunicacions comercials (amb el teu consentiment)</li>
        <li>Millorar els nostres serveis</li>
      </ul>

      <h3>4. Base Legal</h3>
      <p>
        El tractament de les teves dades es basa en el teu consentiment i en l'execució dels serveis sol·licitats.
      </p>

      <h3>5. Els Teus Drets</h3>
      <p>
        Tens dret a accedir, rectificar i suprimir les teves dades, així com a la limitació, la portabilitat i l'oposició
        al seu tractament. Per exercir aquests drets, posa't en contacte amb nosaltres a info@ruehomes.com.
      </p>

      <h3>6. Conservació de les Dades</h3>
      <p>
        Conservarem les teves dades mentre mantinguis relació amb nosaltres o durant el temps necessari
        per complir les obligacions legals.
      </p>
    `,
  },
  "Términos y Condiciones": {
    title: "Termes i Condicions",
    content: `
      <h3>1. Objecte</h3>
      <p>
        Aquests termes i condicions regulen l'ús del lloc web RueHomes i dels serveis
        que s'hi ofereixen.
      </p>

      <h3>2. Condicions d'Ús</h3>
      <p>
        En accedir a aquest lloc web i utilitzar-lo, acceptes quedar vinculat per aquests termes i condicions.
        Si no hi estàs d'acord, si us plau, no utilitzis els nostres serveis.
      </p>

      <h3>3. Serveis Oferts</h3>
      <p>
        RueHomes ofereix serveis d'intermediació immobiliària, que inclouen:
      </p>
      <ul>
        <li>Compravenda de propietats</li>
        <li>Lloguer d'immobles</li>
        <li>Taxació de propietats</li>
        <li>Assessorament immobiliari</li>
      </ul>

      <h3>4. Propietat Intel·lectual</h3>
      <p>
        Tots els continguts del lloc web (textos, imatges, disseny, logotips, etc.) són propietat de
        RueHomes o de tercers que n'han autoritzat l'ús. Queda prohibida la seva reproducció sense
        autorització expressa.
      </p>

      <h3>5. Responsabilitat</h3>
      <p>
        RueHomes s'esforça per mantenir la informació actualitzada i precisa, però no garanteix
        l'exactitud, la integritat o l'actualitat de tota la informació publicada al lloc web.
      </p>

      <h3>6. Modificacions</h3>
      <p>
        Ens reservem el dret de modificar aquests termes i condicions en qualsevol moment.
        Els canvis seran efectius des de la seva publicació al lloc web.
      </p>

      <h3>7. Llei Aplicable</h3>
      <p>
        Aquests termes es regeixen per la legislació espanyola. Per a qualsevol controvèrsia, les parts
        se sotmeten als jutjats i tribunals del domicili de l'usuari.
      </p>
    `,
  },
  Cookies: {
    title: "Política de Galetes",
    content: `
      <h3>1. Què són les Galetes?</h3>
      <p>
        Les galetes (cookies) són petits fitxers de text que s'emmagatzemen al teu dispositiu quan visites
        un lloc web. S'utilitzen per millorar la teva experiència de navegació i oferir funcionalitats.
      </p>

      <h3>2. Ús de Galetes a RueHomes</h3>
      <p>
        Actualment, aquest lloc web <strong>NO utilitza galetes de tercers, analítiques ni publicitàries</strong>.
      </p>
      <p>
        Només s'utilitzen galetes tècniques estrictament necessàries que permeten:
      </p>
      <ul>
        <li>Mantenir la sessió de navegació mentre explores el lloc web</li>
        <li>Garantir el funcionament correcte de les pàgines</li>
        <li>Recordar preferències bàsiques de navegació, com l'idioma</li>
      </ul>

      <h3>3. Galetes Tècniques (Necessàries)</h3>
      <p>
        Aquestes galetes són imprescindibles per al funcionament del lloc web i no requereixen el teu consentiment
        previ segons la normativa vigent. Sense aquestes galetes, el lloc web no podria funcionar correctament.
      </p>
      <p>
        <strong>Tipus:</strong> Galetes de sessió<br>
        <strong>Finalitat:</strong> Navegació i funcionalitat bàsica<br>
        <strong>Durada:</strong> S'eliminen en tancar el navegador
      </p>

      <h3>4. Galetes que NO Utilitzem</h3>
      <p>
        Per a la teva tranquil·litat, aquest lloc web NO utilitza:
      </p>
      <ul>
        <li>❌ Galetes d'anàlisi o estadístiques (Google Analytics, etc.)</li>
        <li>❌ Galetes de publicitat o màrqueting</li>
        <li>❌ Galetes de xarxes socials per fer seguiment</li>
        <li>❌ Galetes de tercers amb finalitats comercials</li>
      </ul>

      <h3>5. Gestió de Galetes</h3>
      <p>
        Tot i que aquest lloc web només utilitza galetes tècniques necessàries, sempre pots configurar el navegador
        per bloquejar o eliminar galetes. Tingues en compte que això podria afectar el funcionament del lloc web.
      </p>
      <p>
        Instruccions per gestionar les galetes als navegadors principals:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647?hl=ca" target="_blank">Chrome</a></li>
        <li><a href="https://support.mozilla.org/ca/kb/galetes" target="_blank">Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank">Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank">Edge</a></li>
      </ul>

      <h3>6. Actualitzacions d'aquesta Política</h3>
      <p>
        Si en el futur incorporem galetes analítiques o d'un altre tipus, actualitzarem
        aquesta política i et demanarem el consentiment quan ho exigeixi la llei.
      </p>
    `,
  },
  "Aviso Legal": {
    title: "Avís Legal",
    content: `
      <h3>1. Dades Identificatives</h3>
      <p>
        En compliment de l'article 10 de la Llei 34/2002, d'11 de juliol, de serveis de la
        societat de la informació i de comerç electrònic, s'informa de les dades següents:
      </p>
      <ul>
        <li><strong>Titular:</strong> RUE HOMES REAL ESTATE S.L.</li>
        <li><strong>NIF:</strong> B09832320</li>
        <li><strong>Domicili:</strong> Rambla de Catalunya, 79, entresòl 2a - Barcelona (08007)</li>
        <li><strong>Correu electrònic:</strong> info@ruehomes.com</li>
        <li><strong>Telèfon:</strong> 642709257</li>
      </ul>
      ${registreMercantil}

      <h3>2. Objecte</h3>
      <p>
        El titular posa a disposició dels usuaris aquest lloc web amb la finalitat de facilitar
        informació sobre serveis immobiliaris i permetre la consulta de les propietats disponibles.
      </p>

      <h3>3. Condicions d'Accés i Ús</h3>
      <p>
        L'accés al lloc web és gratuït. L'usuari es compromet a fer un ús correcte del
        lloc web d'acord amb la legislació vigent i a no dur a terme activitats il·lícites o que
        puguin perjudicar la imatge o els interessos de RueHomes.
      </p>

      <h3>4. Propietat Intel·lectual i Industrial</h3>
      <p>
        Tots els continguts del lloc web (disseny gràfic, codi font, logotips, textos, imatges,
        etc.) són propietat de RueHomes o s'utilitzen amb la deguda autorització. Queden reservats
        tots els drets.
      </p>

      <h3>5. Exclusió de Garanties i Responsabilitat</h3>
      <p>
        RueHomes no es fa responsable dels danys i perjudicis que puguin derivar-se de:
      </p>
      <ul>
        <li>Interrupcions o mal funcionament del lloc web</li>
        <li>Presència de virus o elements nocius en els continguts</li>
        <li>Ús il·lícit o negligent del lloc web per part dels usuaris</li>
        <li>Errors de seguretat o privadesa en la transmissió de dades</li>
      </ul>

      <h3>6. Enllaços</h3>
      <p>
        El lloc web pot contenir enllaços a llocs web de tercers. RueHomes no es responsabilitza
        del contingut d'aquests llocs web ni de les seves polítiques de privadesa o pràctiques.
      </p>

      <h3>7. Protecció de Dades</h3>
      <p>
        Per a informació sobre el tractament de dades personals, consulta la nostra Política de Privacitat.
      </p>

      <h3>8. Legislació Aplicable</h3>
      <p>
        Aquestes condicions es regeixen per la legislació espanyola vigent.
      </p>
    `,
  },
};

export default legalCa;

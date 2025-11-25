import { X } from "lucide-react";
import "./LegalModal.css";

const legalContent = {
  "Política de Privacidad": {
    title: "Política de Privacidad",
    content: `
      <h3>1. Responsable del Tratamiento</h3>
      <p>
        Rue Homes Properties S.L., con NIF B22870430 y domicilio en Calle Lepant, 108 3o 4a - Sabadell (08203),
        es el responsable del tratamiento de los datos personales que nos facilites a través de esta web.
      </p>

      <h3>2. Datos que Recopilamos</h3>
      <p>
        Recopilamos los siguientes datos personales cuando utilizas nuestros servicios:
      </p>
      <ul>
        <li>Nombre y apellidos</li>
        <li>Dirección de correo electrónico</li>
        <li>Número de teléfono</li>
        <li>Información sobre propiedades de interés</li>
      </ul>

      <h3>3. Finalidad del Tratamiento</h3>
      <p>
        Utilizamos tus datos personales para:
      </p>
      <ul>
        <li>Gestionar consultas y solicitudes de información</li>
        <li>Proporcionar servicios inmobiliarios</li>
        <li>Enviar comunicaciones comerciales (con tu consentimiento)</li>
        <li>Mejorar nuestros servicios</li>
      </ul>

      <h3>4. Base Legal</h3>
      <p>
        El tratamiento de tus datos se basa en tu consentimiento y en la ejecución de servicios solicitados.
      </p>

      <h3>5. Tus Derechos</h3>
      <p>
        Tienes derecho a acceder, rectificar, suprimir, limitar, portabilidad y oposición al tratamiento
        de tus datos. Para ejercer estos derechos, contacta con nosotros en info@ruehomes.com.
      </p>

      <h3>6. Conservación de Datos</h3>
      <p>
        Conservaremos tus datos mientras mantengas relación con nosotros o durante el tiempo necesario
        para cumplir con obligaciones legales.
      </p>
    `,
  },
  "Términos y Condiciones": {
    title: "Términos y Condiciones",
    content: `
      <h3>1. Objeto</h3>
      <p>
        Los presentes términos y condiciones regulan el uso del sitio web RueHomes y los servicios
        ofrecidos a través del mismo.
      </p>

      <h3>2. Condiciones de Uso</h3>
      <p>
        Al acceder y utilizar este sitio web, aceptas estar vinculado por estos términos y condiciones.
        Si no estás de acuerdo, por favor no utilices nuestros servicios.
      </p>

      <h3>3. Servicios Ofrecidos</h3>
      <p>
        RueHomes ofrece servicios de intermediación inmobiliaria, incluyendo:
      </p>
      <ul>
        <li>Compra y venta de propiedades</li>
        <li>Alquiler de inmuebles</li>
        <li>Tasación de propiedades</li>
        <li>Asesoramiento inmobiliario</li>
      </ul>

      <h3>4. Propiedad Intelectual</h3>
      <p>
        Todos los contenidos del sitio web (textos, imágenes, diseño, logos, etc.) son propiedad de
        RueHomes o de terceros que han autorizado su uso. Queda prohibida su reproducción sin
        autorización expresa.
      </p>

      <h3>5. Responsabilidad</h3>
      <p>
        RueHomes se esfuerza por mantener la información actualizada y precisa, pero no garantiza la
        exactitud, completitud o actualidad de toda la información publicada en el sitio web.
      </p>

      <h3>6. Modificaciones</h3>
      <p>
        Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.
        Los cambios serán efectivos desde su publicación en el sitio web.
      </p>

      <h3>7. Ley Aplicable</h3>
      <p>
        Estos términos se rigen por la legislación española. Para cualquier controversia, las partes
        se someten a los juzgados y tribunales del domicilio del usuario.
      </p>
    `,
  },
  Cookies: {
    title: "Política de Cookies",
    content: `
      <h3>1. ¿Qué son las Cookies?</h3>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
        un sitio web. Se utilizan para mejorar tu experiencia de navegación y proporcionar funcionalidades.
      </p>

      <h3>2. Uso de Cookies en RueHomes</h3>
      <p>
        Este sitio web actualmente <strong>NO utiliza cookies de terceros, analíticas ni publicitarias</strong>.
      </p>
      <p>
        Solo se utilizan cookies técnicas estrictamente necesarias que permiten:
      </p>
      <ul>
        <li>Mantener la sesión de navegación mientras exploras el sitio</li>
        <li>Garantizar el correcto funcionamiento de las páginas</li>
        <li>Recordar preferencias básicas de navegación</li>
      </ul>

      <h3>3. Cookies Técnicas (Necesarias)</h3>
      <p>
        Estas cookies son esenciales para el funcionamiento del sitio web y no requieren tu consentimiento
        previo según la normativa vigente. Sin estas cookies, el sitio web no podría funcionar correctamente.
      </p>
      <p>
        <strong>Tipo:</strong> Cookies de sesión<br>
        <strong>Finalidad:</strong> Navegación y funcionalidad básica<br>
        <strong>Duración:</strong> Se eliminan al cerrar el navegador
      </p>

      <h3>4. Cookies que NO Utilizamos</h3>
      <p>
        Para tu tranquilidad, este sitio web NO utiliza:
      </p>
      <ul>
        <li>❌ Cookies de análisis o estadísticas (Google Analytics, etc.)</li>
        <li>❌ Cookies de publicidad o marketing</li>
        <li>❌ Cookies de redes sociales para rastreo</li>
        <li>❌ Cookies de terceros con fines comerciales</li>
      </ul>

      <h3>5. Gestión de Cookies</h3>
      <p>
        Aunque este sitio solo usa cookies técnicas necesarias, siempre puedes configurar tu navegador
        para bloquear o eliminar cookies. Ten en cuenta que esto podría afectar al funcionamiento del sitio web.
      </p>
      <p>
        Instrucciones para gestionar cookies en los principales navegadores:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank">Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/cookies" target="_blank">Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank">Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank">Edge</a></li>
      </ul>

      <h3>6. Actualizaciones de esta Política</h3>
      <p>
        En caso de que en el futuro incorporemos cookies analíticas o de otro tipo, actualizaremos
        esta política y solicitaremos tu consentimiento cuando sea legalmente requerido.
      </p>
    `,
  },
  "Aviso Legal": {
    title: "Aviso Legal",
    content: `
      <h3>1. Datos Identificativos</h3>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
        Sociedad de la Información y Comercio Electrónico, se informa de los siguientes datos:
      </p>
      <ul>
        <li><strong>Titular:</strong> Rue Homes Properties S.L.</li>
        <li><strong>NIF:</strong> B22870430</li>
        <li><strong>Domicilio:</strong> Calle Lepant, 108 3o 4a - Sabadell (08203)</li>
        <li><strong>Email:</strong> info@ruehomes.com</li>
        <li><strong>Teléfono:</strong> 642711331</li>
      </ul>

      <h3>2. Objeto</h3>
      <p>
        El titular pone a disposición de los usuarios el presente sitio web con el fin de facilitar
        información sobre servicios inmobiliarios y permitir la consulta de propiedades disponibles.
      </p>

      <h3>3. Condiciones de Acceso y Uso</h3>
      <p>
        El acceso al sitio web es gratuito. El usuario se compromete a hacer un uso correcto del
        sitio web conforme a la legislación vigente y a no realizar actividades ilícitas o que
        puedan dañar la imagen o intereses de RueHomes.
      </p>

      <h3>4. Propiedad Intelectual e Industrial</h3>
      <p>
        Todos los contenidos del sitio web (diseño gráfico, código fuente, logos, textos, imágenes,
        etc.) son propiedad de RueHomes o se utilizan con la debida autorización. Quedan reservados
        todos los derechos.
      </p>

      <h3>5. Exclusión de Garantías y Responsabilidad</h3>
      <p>
        RueHomes no se hace responsable de los daños y perjuicios que pudieran derivarse de:
      </p>
      <ul>
        <li>Interrupciones o mal funcionamiento del sitio web</li>
        <li>Presencia de virus o elementos dañinos en los contenidos</li>
        <li>Uso ilícito o negligente del sitio web por parte de los usuarios</li>
        <li>Fallos en la seguridad o privacidad en la transmisión de datos</li>
      </ul>

      <h3>6. Enlaces</h3>
      <p>
        El sitio web puede contener enlaces a otros sitios de terceros. RueHomes no se responsabiliza
        del contenido de dichos sitios web ni de las políticas de privacidad o prácticas de los mismos.
      </p>

      <h3>7. Protección de Datos</h3>
      <p>
        Para información sobre el tratamiento de datos personales, consulta nuestra Política de Privacidad.
      </p>

      <h3>8. Legislación Aplicable</h3>
      <p>
        Las presentes condiciones se rigen por la legislación española vigente.
      </p>
    `,
  },
};

const LegalModal = ({ isOpen, onClose, section }) => {
  if (!isOpen || !section) return null;

  const content = legalContent[section];

  return (
    <div className="legal-modal-overlay" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={onClose}>
      {/* Modal */}
      <div className="legal-modal-container">
        <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="legal-modal-header">
            <h2 className="legal-modal-title">{content.title}</h2>
            <button
              onClick={onClose}
              className="legal-modal-close-button"
              aria-label="Cerrar modal"
            >
              <X className="legal-modal-close-icon" />
            </button>
          </div>

          {/* Content */}
          <div className="legal-modal-body">
            <div
              className="legal-modal-text"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </div>

          {/* Footer */}
          <div className="legal-modal-footer">
            <button
              onClick={onClose}
              className="legal-modal-footer-button"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;

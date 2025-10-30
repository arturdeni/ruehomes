// src/components/common/ContactForm.jsx
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { validateEmail, validatePhone } from "../../utils/helpers";

const ContactForm = ({
  type = "general",
  propertyId = null,
  propertyTitle = null,
  className = "",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
    acceptPrivacy: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Configurar EmailJS (estas variables deberían estar en .env)
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const getFormTitle = () => {
    switch (type) {
      case "property":
        return `Consulta sobre: ${propertyTitle || "Propiedad"}`;
      case "valuation":
        return "Solicitar Valoración";
      case "premium":
        return "Contacto Servicios Premium";
      default:
        return "Envíanos un mensaje";
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case "property":
        return `Hola, estoy interesado/a en la propiedad "${propertyTitle}". Me gustaría recibir más información.`;
      case "valuation":
        return "Hola, me gustaría solicitar una valoración gratuita de mi propiedad. Por favor, contacten conmigo para coordinar una visita.";
      case "premium":
        return "Hola, estoy interesado/a en sus servicios premium. Me gustaría conocer más detalles sobre sus servicios exclusivos.";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "El formato del email no es válido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "El formato del teléfono no es válido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio";
    }

    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = "Debe aceptar la política de privacidad";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        subject: formData.subject || getFormTitle(),
        form_type: type,
        property_id: propertyId || "",
        property_title: propertyTitle || "",
        to_email: "info@ruehomes.com", // Email de destino
      };

      // Enviar email usando EmailJS
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
      } else {
        console.warn("EmailJS no configurado. Simulando envío...");
        // Simular delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        subject: "",
        acceptPrivacy: false,
      });

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error enviando formulario:", error);
      setErrors({
        submit: "Error al enviar el formulario. Por favor, inténtelo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (success) {
    return (
      <div className={`contact-form-success ${className}`}>
        <div className="success-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 className="success-title">¡Mensaje enviado!</h3>
        <p className="success-text">
          Gracias por contactarnos. Nos pondremos en contacto contigo lo antes
          posible.
        </p>

        <style jsx>{`
          .contact-form-success {
            background-color: var(--color-white);
            border-radius: var(--radius-xl);
            padding: 3rem;
            text-align: center;
            box-shadow: var(--shadow-md);
          }

          .success-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            background-color: var(--color-success);
            color: var(--color-white);
            border-radius: 50%;
            margin-bottom: 1.5rem;
          }

          .success-title {
            font-family: var(--font-primary);
            font-size: 2rem;
            color: var(--color-rust);
            font-weight: 400;
            margin-bottom: 1rem;
          }

          .success-text {
            font-family: var(--font-secondary);
            font-size: 1rem;
            color: var(--color-rust);
            font-weight: 300;
            line-height: 1.6;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`contact-form-container ${className}`}>
      <form onSubmit={handleSubmit} className="contact-form">
        <h3 className="form-title">{getFormTitle()}</h3>

        <div className="form-grid">
          {/* Nombre */}
          <div className="form-field">
            <label htmlFor="name" className="form-field-label">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-field-input ${errors.name ? "error" : ""}`}
              placeholder="Tu nombre"
            />
            {errors.name && <p className="form-field-error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="email" className="form-field-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-field-input ${errors.email ? "error" : ""}`}
              placeholder="tu@email.com"
            />
            {errors.email && <p className="form-field-error">{errors.email}</p>}
          </div>

          {/* Teléfono */}
          <div className="form-field">
            <label htmlFor="phone" className="form-field-label">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-field-input ${errors.phone ? "error" : ""}`}
              placeholder="+34 123 456 789"
            />
            {errors.phone && <p className="form-field-error">{errors.phone}</p>}
          </div>

          {/* Asunto (opcional para algunos tipos) */}
          {type === "general" && (
            <div className="form-field">
              <label htmlFor="subject" className="form-field-label">
                Asunto <span className="optional">(opcional)</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-field-input"
                placeholder="Asunto de tu consulta"
              />
            </div>
          )}
        </div>

        {/* Mensaje */}
        <div className="form-field">
          <label htmlFor="message" className="form-field-label">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`form-field-textarea ${errors.message ? "error" : ""}`}
            placeholder={getDefaultMessage()}
          />
          {errors.message && (
            <p className="form-field-error">{errors.message}</p>
          )}
        </div>

        {/* Checkbox privacidad */}
        <div className="form-privacy">
          <input
            id="acceptPrivacy"
            name="acceptPrivacy"
            type="checkbox"
            checked={formData.acceptPrivacy}
            onChange={handleChange}
            className="form-checkbox"
          />
          <label htmlFor="acceptPrivacy" className="form-privacy-label">
            Acepto la política de privacidad y el tratamiento de mis datos
            personales
          </label>
        </div>
        {errors.acceptPrivacy && (
          <p className="form-field-error">{errors.acceptPrivacy}</p>
        )}

        {/* Error de envío */}
        {errors.submit && (
          <div className="form-submit-error">
            <p>{errors.submit}</p>
          </div>
        )}

        {/* Botón enviar */}
        <button
          type="submit"
          disabled={loading}
          className={`form-submit-button ${loading ? "loading" : ""}`}
        >
          {loading ? (
            <span className="loading-content">
              <div className="loading-spinner"></div>
              Enviando...
            </span>
          ) : (
            "Enviar Mensaje"
          )}
        </button>

        {/* Información adicional */}
        <div className="form-footer">
          <p className="form-footer-text">
            O escríbenos directamente a{" "}
            <a href="mailto:info@ruehomes.com" className="form-footer-link">
              info@ruehomes.com
            </a>
          </p>
        </div>
      </form>

      <style jsx>{`
        .contact-form-container {
          background-color: var(--color-white);
          border-radius: var(--radius-xl);
          padding: 3rem;
          box-shadow: var(--shadow-md);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-title {
          font-family: var(--font-primary);
          font-size: 2rem;
          color: var(--color-rust);
          font-weight: 400;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-field-label {
          font-family: var(--font-secondary);
          font-size: 0.875rem;
          color: var(--color-rust);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .optional {
          font-weight: 300;
          opacity: 0.7;
        }

        .form-field-input,
        .form-field-textarea {
          font-family: var(--font-secondary);
          font-size: 1rem;
          color: var(--color-rust);
          background-color: var(--color-marble);
          border: 1px solid transparent;
          border-radius: var(--radius-lg);
          padding: 0.875rem 1rem;
          transition: all var(--transition-normal);
          outline: none;
        }

        .form-field-input:focus,
        .form-field-textarea:focus {
          background-color: var(--color-white);
          border-color: var(--color-rust);
        }

        .form-field-input.error,
        .form-field-textarea.error {
          border-color: var(--color-error);
        }

        .form-field-input::placeholder,
        .form-field-textarea::placeholder {
          color: var(--color-rust);
          opacity: 0.5;
        }

        .form-field-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-field-error {
          font-family: var(--font-secondary);
          font-size: 0.8rem;
          color: var(--color-error);
          font-weight: 400;
        }

        .form-privacy {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .form-checkbox {
          width: 20px;
          height: 20px;
          margin-top: 0.1rem;
          cursor: pointer;
          accent-color: var(--color-rust);
        }

        .form-privacy-label {
          font-family: var(--font-secondary);
          font-size: 0.875rem;
          color: var(--color-rust);
          font-weight: 300;
          line-height: 1.5;
          cursor: pointer;
        }

        .form-submit-error {
          background-color: var(--color-marble);
          border: 1px solid var(--color-error);
          border-radius: var(--radius-lg);
          padding: 1rem;
          text-align: center;
        }

        .form-submit-error p {
          font-family: var(--font-secondary);
          font-size: 0.875rem;
          color: var(--color-error);
          font-weight: 400;
        }

        .form-submit-button {
          font-family: var(--font-secondary);
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-white);
          background-color: var(--color-rust);
          border: none;
          border-radius: var(--radius-lg);
          padding: 1rem 2rem;
          cursor: pointer;
          transition: all var(--transition-normal);
          letter-spacing: 0.03em;
        }

        .form-submit-button:hover:not(:disabled) {
          background-color: var(--color-rust-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .form-submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid var(--color-white);
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .form-footer {
          text-align: center;
          padding-top: 1rem;
          border-top: 1px solid var(--color-marble);
        }

        .form-footer-text {
          font-family: var(--font-secondary);
          font-size: 0.875rem;
          color: var(--color-rust);
          font-weight: 300;
        }

        .form-footer-link {
          color: var(--color-rust);
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid var(--color-rust);
          transition: all var(--transition-normal);
        }

        .form-footer-link:hover {
          color: var(--color-rust-dark);
          border-bottom-color: var(--color-rust-dark);
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 768px) {
          .contact-form-container {
            padding: 2rem;
          }

          .form-title {
            font-size: 1.75rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .contact-form {
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .contact-form-container {
            padding: 1.5rem;
          }

          .form-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;

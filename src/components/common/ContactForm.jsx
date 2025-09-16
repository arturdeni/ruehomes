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
        return "Contacto General";
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
      <div
        className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}
      >
        <div className="flex justify-center mb-4">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          ¡Mensaje enviado correctamente!
        </h3>
        <p className="text-green-700">
          Gracias por contactarnos. Nos pondremos en contacto contigo lo antes
          posible.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {getFormTitle()}
          </h3>
        </div>

        {/* Nombre */}
        <div>
          <label htmlFor="name" className="form-label">
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? "border-red-300" : ""}`}
            placeholder="Introduce tu nombre completo"
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? "border-red-300" : ""}`}
            placeholder="tu@email.com"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="form-label">
            Teléfono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-input ${errors.phone ? "border-red-300" : ""}`}
            placeholder="+34 123 456 789"
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>

        {/* Asunto (opcional para algunos tipos) */}
        {type === "general" && (
          <div>
            <label htmlFor="subject" className="form-label">
              Asunto
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
              placeholder="Asunto de tu consulta"
            />
          </div>
        )}

        {/* Mensaje */}
        <div>
          <label htmlFor="message" className="form-label">
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`form-input ${errors.message ? "border-red-300" : ""}`}
            placeholder={getDefaultMessage()}
          />
          {errors.message && <p className="form-error">{errors.message}</p>}
        </div>

        {/* Checkbox privacidad */}
        <div className="flex items-start">
          <input
            id="acceptPrivacy"
            name="acceptPrivacy"
            type="checkbox"
            checked={formData.acceptPrivacy}
            onChange={handleChange}
            className={`mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
              errors.acceptPrivacy ? "border-red-300" : ""
            }`}
          />
          <label htmlFor="acceptPrivacy" className="ml-3 text-sm text-gray-700">
            Acepto la{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              política de privacidad
            </a>{" "}
            y el tratamiento de mis datos personales *
          </label>
        </div>
        {errors.acceptPrivacy && (
          <p className="form-error ml-7">{errors.acceptPrivacy}</p>
        )}

        {/* Error de envío */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{errors.submit}</p>
          </div>
        )}

        {/* Botón enviar */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full btn-primary ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="loading-spinner mr-2"></div>
                Enviando...
              </span>
            ) : (
              "Enviar Mensaje"
            )}
          </button>
        </div>

        {/* Información adicional */}
        <div className="text-center text-sm text-gray-600">
          <p>También puedes contactarnos directamente:</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
            <a
              href="tel:+34123456789"
              className="text-blue-600 hover:text-blue-500"
            >
              📞 +34 123 456 789
            </a>
            <a
              href="mailto:info@ruehomes.com"
              className="text-blue-600 hover:text-blue-500"
            >
              ✉️ info@ruehomes.com
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

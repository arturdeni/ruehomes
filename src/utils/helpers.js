// src/utils/helpers.js

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si el formato es v�lido
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida formato de tel�fono espa�ol
 * @param {string} phone - Tel�fono a validar
 * @returns {boolean} - True si el formato es v�lido
 */
export const validatePhone = (phone) => {
  // Acepta formatos: +34 123 456 789, 123456789, +34123456789, etc.
  const phoneRegex = /^(\+34|0034|34)?[\s.-]?[6-9]\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

/**
 * Formatea un precio con separadores de miles
 * @param {number} price - Precio a formatear
 * @returns {string} - Precio formateado
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Trunca un texto a un n�mero m�ximo de caracteres
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud m�xima
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Optimiza una URL de imagen de Hygraph aplicando transformaciones
 * @param {string} url - URL original de la imagen
 * @param {object} options - Opciones de optimización
 * @param {number} options.width - Ancho deseado (opcional)
 * @param {number} options.height - Alto deseado (opcional)
 * @param {number} options.quality - Calidad de la imagen 0-100 (default: 80)
 * @param {string} options.format - Formato de imagen (default: 'webp')
 * @returns {string} - URL optimizada
 */
export const optimizeImageUrl = (
  url,
  { width, height, quality = 80, format = "webp" } = {}
) => {
  if (!url) return "";

  const params = new URLSearchParams();

  // Formato y compresión automática
  params.append("auto", "format,compress");

  // Formato específico (WebP por defecto)
  if (format) {
    params.append("fm", format);
  }

  // Calidad
  params.append("q", quality.toString());

  // Dimensiones
  if (width) {
    params.append("w", width.toString());
  }
  if (height) {
    params.append("h", height.toString());
  }

  // Construir URL final
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${params.toString()}`;
};

// src/utils/helpers.js

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si el formato es válido
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida formato de teléfono español
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} - True si el formato es válido
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
 * Trunca un texto a un número máximo de caracteres
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

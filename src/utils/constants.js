// src/utils/constants.js
export const PROPERTY_TYPES = {
  apartment: "Piso",
  house: "Casa",
  commercial: "Local Comercial",
  office: "Oficina",
  warehouse: "Nave Industrial",
  land: "Terreno",
};

export const PROPERTY_STATUS = {
  sale: "Venta",
  rent: "Alquiler",
  sold: "Vendido",
  rented: "Alquilado",
};

export const PROPERTY_STATUS_COLORS = {
  sale: "bg-green-500",
  rent: "bg-blue-500",
  sold: "bg-gray-500",
  rented: "bg-gray-500",
};

export const COMMON_FEATURES = [
  "Garaje",
  "Piscina",
  "Jardín",
  "Terraza",
  "Balcón",
  "Ascensor",
  "Aire acondicionado",
  "Calefacción",
  "Chimenea",
  "Trastero",
  "Armarios empotrados",
  "Parquet",
  "Cocina equipada",
  "Amueblado",
  "Reformado",
  "Exterior",
  "Luminoso",
  "Céntrico",
  "Zona tranquila",
  "Buenas vistas",
];

export const CITIES = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Zaragoza",
  "Málaga",
  "Murcia",
  "Palma",
  "Las Palmas de Gran Canaria",
  "Bilbao",
  "Alicante",
  "Córdoba",
  "Valladolid",
  "Vigo",
  "Gijón",
  "Hospitalet de Llobregat",
  "A Coruña",
  "Vitoria-Gasteiz",
  "Granada",
  "Elche",
];

export const PRICE_RANGES = {
  sale: [
    { label: "Hasta 100.000€", min: 0, max: 100000 },
    { label: "100.000€ - 200.000€", min: 100000, max: 200000 },
    { label: "200.000€ - 300.000€", min: 200000, max: 300000 },
    { label: "300.000€ - 500.000€", min: 300000, max: 500000 },
    { label: "500.000€ - 750.000€", min: 500000, max: 750000 },
    { label: "Más de 750.000€", min: 750000, max: null },
  ],
  rent: [
    { label: "Hasta 500€", min: 0, max: 500 },
    { label: "500€ - 800€", min: 500, max: 800 },
    { label: "800€ - 1.200€", min: 800, max: 1200 },
    { label: "1.200€ - 1.800€", min: 1200, max: 1800 },
    { label: "1.800€ - 2.500€", min: 1800, max: 2500 },
    { label: "Más de 2.500€", min: 2500, max: null },
  ],
};

export const SORT_OPTIONS = [
  { value: "createdAt_DESC", label: "Más recientes" },
  { value: "createdAt_ASC", label: "Más antiguos" },
  { value: "price_ASC", label: "Precio menor a mayor" },
  { value: "price_DESC", label: "Precio mayor a menor" },
  { value: "area_DESC", label: "Mayor superficie" },
  { value: "area_ASC", label: "Menor superficie" },
];

// src/utils/helpers.js
export const formatPrice = (price, status = "sale") => {
  if (typeof price !== "number") return "Consultar precio";

  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedPrice = formatter.format(price);

  if (status === "rent") {
    return `${formattedPrice}/mes`;
  }

  return formattedPrice;
};

export const formatPriceCompact = (price) => {
  if (typeof price !== "number") return "Consultar";

  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M€`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K€`;
  }
  return `${price}€`;
};

export const formatArea = (area) => {
  if (typeof area !== "number") return "";
  return `${area}m²`;
};

export const getPropertyTypeLabel = (type) => {
  return PROPERTY_TYPES[type] || type;
};

export const getStatusLabel = (status) => {
  return PROPERTY_STATUS[status] || status;
};

export const getStatusColor = (status) => {
  return PROPERTY_STATUS_COLORS[status] || "bg-gray-500";
};

export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export const generateImageAlt = (property) => {
  const { title, propertyType, city, address } = property;
  const typeLabel = getPropertyTypeLabel(propertyType);

  if (title) {
    return `${title} - ${typeLabel} en ${city}`;
  }

  return `${typeLabel} en ${address || city}`;
};

export const generatePropertyUrl = (property) => {
  if (!property || !property.id) return "";

  const slug = property.title
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  return `/propiedad/${property.id}${slug ? `/${slug}` : ""}`;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[0-9\s\-()]{9,}$/;
  return phoneRegex.test(phone);
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return "";

  // Eliminar caracteres no numéricos excepto +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Formatear número español
  if (cleaned.startsWith("34") || cleaned.startsWith("+34")) {
    const number = cleaned.replace(/^\+?34/, "");
    if (number.length === 9) {
      return `+34 ${number.substring(0, 3)} ${number.substring(
        3,
        6
      )} ${number.substring(6)}`;
    }
  }

  return phone;
};

export const generateWhatsAppUrl = (phone, message = "") => {
  const cleanPhone = phone.replace(/[^\d+]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Error copying to clipboard:", err);
    return false;
  }
};

export const shareProperty = async (property) => {
  if (!property) return false;

  const shareData = {
    title: property.title,
    text: `${property.title} - ${getPropertyTypeLabel(
      property.propertyType
    )} en ${property.city}`,
    url: window.location.origin + generatePropertyUrl(property),
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return true;
    } else {
      // Fallback: copiar URL al portapapeles
      return await copyToClipboard(shareData.url);
    }
  } catch (err) {
    console.error("Error sharing:", err);
    return false;
  }
};

export const getImageOptimizedUrl = (
  url,
  width = 800,
  height = 600,
  quality = 80
) => {
  if (!url) return "";

  // Si es una URL de Hygraph, agregar parámetros de optimización
  if (url.includes("hygraph.com") || url.includes("graphassets.com")) {
    const params = new URLSearchParams({
      w: width.toString(),
      h: height.toString(),
      fit: "crop",
      q: quality.toString(),
    });

    return `${url}?${params.toString()}`;
  }

  return url;
};

export const lazyLoadImage = (img) => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        observer.unobserve(lazyImage);
      }
    });
  });

  imageObserver.observe(img);
};

export const formatDate = (dateString, options = {}) => {
  if (!dateString) return "";

  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString("es-ES", {
    ...defaultOptions,
    ...options,
  });
};

export const getRelativeTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return "Hace menos de 1 hora";
  } else if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
  } else if (diffInHours < 24 * 7) {
    const days = Math.floor(diffInHours / 24);
    return `Hace ${days} día${days > 1 ? "s" : ""}`;
  } else if (diffInHours < 24 * 30) {
    const weeks = Math.floor(diffInHours / (24 * 7));
    return `Hace ${weeks} semana${weeks > 1 ? "s" : ""}`;
  } else {
    const months = Math.floor(diffInHours / (24 * 30));
    return `Hace ${months} mes${months > 1 ? "es" : ""}`;
  }
};

export const generateSEOTitle = (property) => {
  if (!property) return "RueHomes - Agencia Inmobiliaria";

  const { title, propertyType, city, price, status } = property;
  const typeLabel = getPropertyTypeLabel(propertyType);
  const statusLabel = getStatusLabel(status);
  const priceFormatted = formatPriceCompact(price);

  return `${
    title || `${typeLabel} en ${city}`
  } - ${statusLabel} ${priceFormatted} | RueHomes`;
};

export const generateSEODescription = (property) => {
  if (!property)
    return "Encuentra tu hogar ideal con RueHomes. Más de 10 años ayudando a familias a encontrar la casa de sus sueños.";

  const {
    title,
    propertyType,
    city,
    price,
    status,
    bedrooms,
    bathrooms,
    area,
    description,
  } = property;

  const typeLabel = getPropertyTypeLabel(propertyType);
  const statusLabel = getStatusLabel(status).toLowerCase();
  const priceFormatted = formatPrice(price, status);

  let desc = `${typeLabel} en ${statusLabel} en ${city}`;

  if (bedrooms || bathrooms || area) {
    const features = [];
    if (bedrooms) features.push(`${bedrooms} habitaciones`);
    if (bathrooms) features.push(`${bathrooms} baños`);
    if (area) features.push(`${area}m²`);
    desc += ` con ${features.join(", ")}`;
  }

  desc += `. Precio: ${priceFormatted}`;

  if (description?.text) {
    const shortDesc = truncateText(description.text, 100);
    desc += `. ${shortDesc}`;
  }

  return desc;
};

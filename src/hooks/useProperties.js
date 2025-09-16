// src/hooks/useProperties.js
import { useState, useEffect } from "react";
import { getProperties } from "../services/hygraph";

export const useProperties = (filters = {}, page = 1, limit = 12) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construir el objeto where para GraphQL
        const where = {};

        if (filters.status) {
          where.status = filters.status;
        }

        if (filters.propertyType) {
          where.propertyType = filters.propertyType;
        }

        if (filters.city) {
          where.city_contains = filters.city;
        }

        if (filters.minPrice || filters.maxPrice) {
          where.price = {};
          if (filters.minPrice) where.price.gte = filters.minPrice;
          if (filters.maxPrice) where.price.lte = filters.maxPrice;
        }

        if (filters.minBedrooms) {
          where.bedrooms_gte = filters.minBedrooms;
        }

        if (filters.minBathrooms) {
          where.bathrooms_gte = filters.minBathrooms;
        }

        if (filters.minArea || filters.maxArea) {
          where.area = {};
          if (filters.minArea) where.area.gte = filters.minArea;
          if (filters.maxArea) where.area.lte = filters.maxArea;
        }

        if (filters.features && filters.features.length > 0) {
          where.features_contains_some = filters.features;
        }

        if (filters.search) {
          where.OR = [
            { title_contains: filters.search },
            { address_contains: filters.search },
            { city_contains: filters.search },
            { description: { text_contains: filters.search } },
          ];
        }

        // Calcular skip para paginación
        const skip = (page - 1) * limit;

        const data = await getProperties({
          first: limit,
          skip,
          where: Object.keys(where).length > 0 ? where : undefined,
        });

        setProperties(data.properties || []);
        setTotalCount(data.propertiesConnection?.aggregate?.count || 0);
        setHasNextPage(data.properties?.length === limit);
      } catch (err) {
        console.error("Error loading properties:", err);
        setError(err.message);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [filters, page, limit]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    properties,
    loading,
    error,
    totalCount,
    totalPages,
    hasNextPage,
    currentPage: page,
  };
};

// src/hooks/useFilters.js
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Estado inicial de filtros basado en URL params
  const [filters, setFilters] = useState(() => {
    return {
      status: searchParams.get("status") || "",
      propertyType: searchParams.get("type") || "",
      city: searchParams.get("city") || "",
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : null,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : null,
      minBedrooms: searchParams.get("minBedrooms")
        ? Number(searchParams.get("minBedrooms"))
        : null,
      minBathrooms: searchParams.get("minBathrooms")
        ? Number(searchParams.get("minBathrooms"))
        : null,
      minArea: searchParams.get("minArea")
        ? Number(searchParams.get("minArea"))
        : null,
      maxArea: searchParams.get("maxArea")
        ? Number(searchParams.get("maxArea"))
        : null,
      features: searchParams.get("features")
        ? searchParams.get("features").split(",")
        : [],
      search: searchParams.get("search") || "",
      sortBy: searchParams.get("sortBy") || "createdAt_DESC",
    };
  });

  // Sincronizar filtros con URL
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== "" && value !== undefined) {
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(","));
        } else if (!Array.isArray(value)) {
          params.set(key, value.toString());
        }
      }
    });

    setSearchParams(params);
  }, [filters, setSearchParams]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      propertyType: "",
      city: "",
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      minBathrooms: null,
      minArea: null,
      maxArea: null,
      features: [],
      search: "",
      sortBy: "createdAt_DESC",
    });
  };

  const clearFilter = (key) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (Array.isArray(newFilters[key])) {
        newFilters[key] = [];
      } else {
        newFilters[key] = typeof prev[key] === "number" ? null : "";
      }
      return newFilters;
    });
  };

  // Contar filtros activos
  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return (
      value !== null &&
      value !== "" &&
      value !== undefined &&
      value !== "createdAt_DESC"
    );
  }).length;

  // Verificar si hay filtros aplicados
  const hasActiveFilters = activeFiltersCount > 0;

  return {
    filters,
    updateFilter,
    updateFilters,
    clearFilters,
    clearFilter,
    activeFiltersCount,
    hasActiveFilters,
  };
};

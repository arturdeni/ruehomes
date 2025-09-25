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

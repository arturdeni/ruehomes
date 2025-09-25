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

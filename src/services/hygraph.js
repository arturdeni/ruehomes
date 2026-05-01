// src/services/hygraph.js
import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT;
const token = import.meta.env.VITE_HYGRAPH_TOKEN;

if (!endpoint) {
  throw new Error("VITE_HYGRAPH_ENDPOINT environment variable is required");
}

// Configure headers only if token exists
const headers = token ? { Authorization: `Bearer ${token}` } : {};

export const hygraph = new GraphQLClient(endpoint, {
  headers,
});

// Queries para propiedades - Updated to match Hygraph schema
export const GET_PROPERTIES = `
  query GetProperties(
    $first: Int = 100
    $skip: Int = 0
    $where: PropertyWhereInput
    $orderBy: PropertyOrderByInput = createdAt_DESC
  ) {
    properties(first: $first, skip: $skip, where: $where, orderBy: $orderBy) {
      id
      title
      description {
        text
      }
      price
      propertyType
      propertyStatus
      bedrooms
      bathrooms
      area
      address
      city
      reference
      coordinates {
        latitude
        longitude
      }
      images(first: 50) {
        id
        url
        fileName
      }
      features
      energyRating
      yearBuilt
      createdAt
      updatedAt
    }
    propertiesConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_PROPERTY_BY_ID = `
  query GetPropertyById($id: ID!) {
    property(where: { id: $id }) {
      id
      title
      description {
        html
        text
      }
      price
      propertyType
      propertyStatus
      bedrooms
      bathrooms
      area
      address
      city
      reference
      coordinates {
        latitude
        longitude
      }
      images(first: 50) {
        id
        url
        fileName
        width
        height
      }
      features
      energyRating
      yearBuilt
      createdAt
      updatedAt
    }
  }
`;

export const GET_FEATURED_PROPERTIES = `
  query GetFeaturedProperties($first: Int = 6) {
    properties(first: $first, orderBy: createdAt_DESC) {
      id
      title
      description {
        text
      }
      price
      propertyType
      propertyStatus
      bedrooms
      bathrooms
      area
      address
      city
      reference
      images(first: 1) {
        id
        url
        fileName
      }
      features
    }
  }
`;

// Funciones para hacer las queries
export const getProperties = async (variables = {}) => {
  try {
    const data = await hygraph.request(GET_PROPERTIES, variables);
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const getPropertyById = async (id) => {
  try {
    const data = await hygraph.request(GET_PROPERTY_BY_ID, { id });
    return data.property;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
};

export const getFeaturedProperties = async (first = 6) => {
  try {
    const data = await hygraph.request(GET_FEATURED_PROPERTIES, { first });
    return data.properties;
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    throw error;
  }
};

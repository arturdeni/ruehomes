// src/services/hygraph.js
import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT;
const token = import.meta.env.VITE_HYGRAPH_TOKEN;

if (!endpoint) {
  throw new Error("VITE_HYGRAPH_ENDPOINT environment variable is required");
}

export const hygraph = new GraphQLClient(endpoint, {
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// Queries para propiedades
export const GET_PROPERTIES = `
  query GetProperties($first: Int, $skip: Int, $where: PropertyWhereInput) {
    properties(first: $first, skip: $skip, where: $where, orderBy: createdAt_DESC) {
      id
      title
      description {
        text
      }
      price
      propertyType
      status
      bedrooms
      bathrooms
      area
      address
      city
      coordinates {
        latitude
        longitude
      }
      images {
        id
        url
        alt
      }
      features
      energyRating
      yearBuilt
      featured
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
      status
      bedrooms
      bathrooms
      area
      address
      city
      coordinates {
        latitude
        longitude
      }
      images {
        id
        url
        alt
        width
        height
      }
      features
      energyRating
      yearBuilt
      featured
      createdAt
      updatedAt
    }
  }
`;

export const GET_FEATURED_PROPERTIES = `
  query GetFeaturedProperties($first: Int = 6) {
    properties(first: $first, where: { featured: true }, orderBy: createdAt_DESC) {
      id
      title
      description {
        text
      }
      price
      propertyType
      status
      bedrooms
      bathrooms
      area
      address
      city
      images(first: 1) {
        id
        url
        alt
      }
      features
    }
  }
`;

export const GET_AGENCY_INFO = `
  query GetAgencyInfo {
    agencies(first: 1) {
      id
      name
      description {
        html
      }
      phone
      email
      address
      logo {
        url
        alt
      }
      socialMedia
    }
  }
`;

export const GET_AGENTS = `
  query GetAgents {
    agents {
      id
      name
      position
      phone
      email
      photo {
        url
        alt
      }
      bio {
        html
      }
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

export const getAgencyInfo = async () => {
  try {
    const data = await hygraph.request(GET_AGENCY_INFO);
    return data.agencies[0];
  } catch (error) {
    console.error("Error fetching agency info:", error);
    throw error;
  }
};

export const getAgents = async () => {
  try {
    const data = await hygraph.request(GET_AGENTS);
    return data.agents;
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw error;
  }
};

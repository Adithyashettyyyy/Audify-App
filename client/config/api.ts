// API Configuration for different environments
const getApiBaseUrl = () => {
  // In development, use relative URLs
  if (import.meta.env.DEV) {
    return '';
  }
  
  // In production, use the Render server URL
  return import.meta.env.VITE_API_BASE_URL || 'https://audify-app-1.onrender.com';
};

export const API_BASE_URL = getApiBaseUrl();

export const createApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};

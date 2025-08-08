// API Configuration for different environments
const getApiBaseUrl = () => {
  // In development, use relative URLs
  if (import.meta.env.DEV) {
    return '';
  }
  
  // In production, use the Render server URL
  // You'll need to replace this with your actual Render app URL
  return import.meta.env.VITE_API_BASE_URL || 'https://your-render-app-name.onrender.com';
};

export const API_BASE_URL = getApiBaseUrl();

export const createApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};

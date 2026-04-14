export const API_BASE_URL = 'http://localhost:8080/api';

export const REST_ENDPOINTS = {
  auth: `${API_BASE_URL}/auth`,
  clientes: `${API_BASE_URL}/clientes`,
  veterinarios: `${API_BASE_URL}/veterinarios`,
  mascotas: `${API_BASE_URL}/mascotas`,
  drogas: `${API_BASE_URL}/drogas`,
  tratamientos: `${API_BASE_URL}/tratamientos`,
} as const;
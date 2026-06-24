// ============================================================
// Bichuten Admin Panel - API Service
// ============================================================

const API_BASE = '/bichuten_backend/admin';

let csrfToken = '';

// Reusable fetch wrapper that automatically includes credentials
export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  
  const defaultHeaders = {};
  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }
  
  if (csrfToken) {
    defaultHeaders['X-CSRF-Token'] = csrfToken;
  }

  const finalOptions = {
    credentials: 'include', // Extremely important for PHP sessions
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  };

  const response = await fetch(url, finalOptions);
  const data = await response.json();

  if (data && data.csrfToken) {
    csrfToken = data.csrfToken;
  }
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

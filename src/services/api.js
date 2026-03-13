import axios from 'axios';

const api = axios.create({
  baseURL: 'http://191.252.204.249:8000',
});

// Este "Interceptor" é o segredo: ele pega o token do seu navegador 
// e coloca no cabeçalho Authorization de cada chamada automaticamente.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
export default api;
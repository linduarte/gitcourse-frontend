import axios from 'axios';

const api = axios.create({
  baseURL: 'http://191.252.204.249:8000',
});

// Padronizando o nome da exportação
export const getTopic = async (slug) => {
  try {
    const response = await api.get(`/topics/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Erro na chamada da API:", error);
    throw error;
  }
};

export default api;

// Busca a LISTA de todos os tópicos
export const getTopics = async () => {
  try {
    const response = await api.get('/topics'); // Rota que retorna o array de tópicos
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar lista de tópicos:", error);
    throw error;
  }
};
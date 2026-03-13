import { api } from "./api";

export async function loginRequest(email, password) {
  try {
    // Trocamos 'email' por 'username' para bater com o Backend Python
    const response = await api.post("/auth/login", {
      username: email, 
      password: password,
    });

    // Dentro do seu return do loginRequest:
return {
  ok: true,
  data: {
    token: response.data.access_token,
    user: { 
      name: "Ana Teste", // Agora o "Bem-vindo" terá um nome!
      email: email 
    }
  },
};
  } catch (error) {
    console.error("Erro capturado:", error.response?.data);
    const message =
      error.response?.data?.detail || // O FastAPI geralmente envia erros em 'detail'
      "Erro ao tentar fazer login. Verifique suas credenciais.";

    return {
      ok: false,
      error: message,
    };
  }
}
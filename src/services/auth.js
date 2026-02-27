import { api } from "./api";

export async function loginRequest(email, password) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Erro ao tentar fazer login. Verifique suas credenciais.";

    return {
      ok: false,
      error: message,
    };
  }
}

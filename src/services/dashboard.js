import { api } from "./api";

export async function getDashboardData() {
  try {
    const response = await api.get("/dashboard");

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || "Erro ao carregar o dashboard.",
    };
  }
}

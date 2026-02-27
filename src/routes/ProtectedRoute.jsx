import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  // Enquanto verifica sessão persistida
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não estiver autenticado, redireciona para login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza a página protegida
  return children;
}

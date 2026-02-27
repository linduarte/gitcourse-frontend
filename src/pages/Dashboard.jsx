import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getDashboardData } from "../services/dashboard";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const result = await getDashboardData();

      if (result.ok) {
        setDashboard(result.data);
      } else {
        setError(result.error);
      }

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return <div style={styles.center}>Carregando dashboard...</div>;
  }

  if (error) {
    return <div style={styles.center}>Erro: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Bem-vindo, {user?.name}!</h2>

        <p style={styles.text}>Aqui estão seus dados:</p>

        <pre style={styles.pre}>
          {JSON.stringify(dashboard, null, 2)}
        </pre>

        <button style={styles.button} onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
}

const styles = { /* ... */ };

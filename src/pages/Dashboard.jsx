import React, { useEffect, useState } from 'react';
import  api  from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState({ email: '', message: '' });
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        console.log("Dados Brutos da VPS:", response.data);

        // 1. Armazena os dados do usuário (email e mensagem)
        setData({
          email: response.data.email || '',
          message: response.data.message || 'Bem-vindo!'
        });

        // 2. Tenta pegar os tópicos. Se não vierem da API, usamos um 
        // array de teste para você validar o layout agora.
        const topicsDaAPI = response.data.topics || [];
        
        if (topicsDaAPI.length > 0) {
          setTopics(topicsDaAPI);
        } else {
          // Mock/Teste: Para você não ver a tela vazia enquanto ajustamos o backend
          setTopics([
            { id: 2, title: "Introdução ao Git", description: "Conteúdo carregado via script de teste." }
          ]);
        }

      } catch (error) {
        console.error("Erro na conexão com a VPS:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Conectando à VPS...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <h1>{data.message}</h1>
        <p>Logado como: <strong>{data.email}</strong></p>
      </header>

      <section>
        <h2 style={{ color: '#555' }}>Seus Tópicos de Estudo:</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginTop: '20px' 
        }}>
          {topics.map((topic) => (
            <div key={topic.id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '12px', 
              padding: '20px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ marginTop: 0, color: '#007bff' }}>{topic.title}</h3>
              <p style={{ color: '#666', minHeight: '50px' }}>{topic.description}</p>
              <button style={{ 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Acessar Lição
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
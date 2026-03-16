import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../services/api";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopics().then(data => {
      setTopics(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Carregando tópicos...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800 border-b-2 pb-2">
        Módulos do GitCourse
      </h1>
      
      <div className="grid gap-4">
        {topics.map(topic => (
          <Link 
            key={topic.slug} 
            to={`/topics/${topic.slug}`}
            className="block p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all no-underline text-slate-700"
          >
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">{topic.title}</span>
              <span className="text-blue-500 font-bold">Acessar →</span>
            </div>
          </Link>
        ))}
      </div>

      {topics.length === 0 && (
        <p className="text-slate-500 italic">Nenhum tópico encontrado no banco de dados.</p>
      )}
    </div>
  );
}
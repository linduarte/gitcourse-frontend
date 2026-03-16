import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopic } from "../services/api"; // Nome deve ser igual ao export da api.js
import ReactMarkdown from "react-markdown";

export default function Topic() {
  const { slug } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aqui fazemos a chamada ao backend da VPS
    getTopic(slug)
      .then(data => {
        setTopic(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false); // Evita o loop infinito em caso de erro
      });
  }, [slug]);

  if (loading) return <p className="p-10">Conectando ao servidor na VPS...</p>;
  if (!topic) return <p className="p-10 text-red-500">Tópico não encontrado no banco de dados.</p>;

  return (
  <div className="intro-page">
    {/* Removemos qualquer div extra que possa estar com o fundo branco do Tailwind */}
    <main dangerouslySetInnerHTML={{ __html: topic.content }} />
  </div>
);
}
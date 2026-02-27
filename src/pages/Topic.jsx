import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopic } from "../services/api";
import ReactMarkdown from "react-markdown";

export default function Topic() {
  const { slug } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopic(slug).then(data => {
      setTopic(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <p>Carregando...</p>;
  if (!topic) return <p>Tópico não encontrado.</p>;

  return (
    <div>
      <h1>{topic.title}</h1>
      <ReactMarkdown>{topic.content}</ReactMarkdown>
    </div>
  );
}

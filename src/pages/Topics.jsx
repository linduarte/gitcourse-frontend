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
    <div>
      <h1>Tópicos</h1>
      <ul>
        {topics.map(topic => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

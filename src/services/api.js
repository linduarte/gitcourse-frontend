const API_URL = "https://gitcourse-backend.onrender.com"; // ou seu backend local

export async function getTopics() {
  const res = await fetch(`${API_URL}/topics/`);
  return res.json();
}

export async function getTopic(slug) {
  const res = await fetch(`${API_URL}/topics/${slug}`);
  return res.json();
}

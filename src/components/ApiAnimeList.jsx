import React, { useEffect, useState } from "react";

const BASE_URL = "https://api.jikan.moe/v4/seasons/upcoming";

export default function AnimeList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(BASE_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Erro na requisição");
        return res.json();
      })
      .then((data) => {
        setItems(data.data); // a lista de animes está dentro de data.data
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando animes...</p>;
  if (error) return <p style={{ color: "red" }}>Erro: {error}</p>;
  if (items.length === 0) return <p>Nenhum anime encontrado.</p>;

  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: 0,
        justifyContent: "center",
      }}
    >
      {items.map((item) => (
        <li
          key={item.mal_id}
          style={{
            listStyle: "none",
            padding: "10px",
            background: "#fff",
            borderRadius: "8px",
            textAlign: "center",
            width: "150px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={item.images.jpg.image_url}
            alt={item.title}
            style={{ width: "120px", height: "120px", objectFit: "contain" }}
          />
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>{item.title}</p>
        </li>
      ))}
    </ul>
  );
}

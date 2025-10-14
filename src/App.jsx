import React, { useState, useEffect } from "react";

function AnimeList({ category, reload }) {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os dados da API conforme a categoria
  const fetchAnimes = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "";
      if (category === "upcoming") {
        url = "https://api.jikan.moe/v4/seasons/upcoming";
      } else if (category === "popular") {
        url = "https://api.jikan.moe/v4/top/anime"; // Exemplo de outra categoria
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erro na API");

      // Ajusta o array de animes conforme a resposta da API (vêm em data.data)
      setAnimes(data.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnimes();
  }, [category, reload]);

  if (loading) return <p>Carregando animes...</p>;
  if (error) return <p style={{ color: "red" }}>Erro: {error}</p>;
  if (animes.length === 0) return <p>Nenhum anime encontrado.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0, maxWidth: 800, margin: "auto" }}>
      {animes.map((anime) => (
        <li
          key={anime.mal_id}
          style={{
            display: "flex",
            gap: 15,
            marginBottom: 20,
            padding: 15,
            borderRadius: 8,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            backgroundColor: "#f9f9f9",
            alignItems: "center",
          }}
        >
          <img
            src={anime.images?.jpg?.image_url || anime.image_url || ""}
            alt={anime.title}
            style={{ width: 80, height: 110, objectFit: "cover", borderRadius: 6 }}
          />
          <div style={{ flex: 1, textAlign: "left" }}>
            <h3 style={{ margin: "0 0 8px" }}>{anime.title}</h3>
            {anime.season && anime.year && (
              <p style={{ margin: 0, fontStyle: "italic", color: "#555" }}>
                Temporada: {anime.season} {anime.year}
              </p>
            )}
            {anime.synopsis && (
              <p style={{ marginTop: 6, fontSize: 14, color: "#333", maxHeight: 60, overflow: "hidden", textOverflow: "ellipsis" }}>
                {anime.synopsis}
              </p>
            )}
            <a
              href={anime.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a3d7c", fontWeight: "bold", fontSize: 14 }}
            >
              Ver no MyAnimeList
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [reload, setReload] = useState(0);
  const [category, setCategory] = useState("upcoming"); // upcoming ou popular

  const handleReload = () => setReload((prev) => prev + 1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#fff",
        textAlign: "center",
        margin: 0,
        padding: "40px 20px 60px",
        width: "100vw",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#1a3d7c",
      }}
    >
      <h1 style={{ marginBottom: 40 }}>
        {category === "upcoming" ? "Animes da Próxima Temporada" : "Animes Populares"}
      </h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 25 }}>
        <button
          onClick={() => setCategory("upcoming")}
          style={{
            ...buttonBaseStyle,
            backgroundColor: category === "upcoming" ? "#1450a0" : "#1a3d7c",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1450a0")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              category === "upcoming" ? "#1450a0" : "#1a3d7c")
          }
        >
          Próximos Animes
        </button>

        <button
          onClick={() => setCategory("popular")}
          style={{
            ...buttonBaseStyle,
            backgroundColor: category === "popular" ? "#1450a0" : "#1a3d7c",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1450a0")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              category === "popular" ? "#1450a0" : "#1a3d7c")
          }
        >
          Animes Populares
        </button>
      </div>

      <button
        onClick={handleReload}
        style={{
          ...buttonBaseStyle,
          padding: "12px 28px",
          marginBottom: 30,
          fontSize: 16,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1450a0")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a3d7c")}
      >
        Atualizar Lista
      </button>

      <AnimeList category={category} reload={reload} />
    </div>
  );
}

const buttonBaseStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: 8,
  backgroundColor: "#1a3d7c",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.2s, transform 0.1s",
};

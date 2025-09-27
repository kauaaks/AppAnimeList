import React, { useEffect, useState } from "react";

const BASE_URL = "https://api.jikan.moe/v4/seasons/upcoming"; // <-- mudar aqui para sua API 
 
export default function AnimeList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
       //Aqui assumimos que a API retorna um array em data.results
       Promise.all(
        data.results.map((item) => 
          fetch(item.url)
            .then((res) => res.json())
            .then((details) => ({
              name: item.name,
              image:
              details.sprites?.other?.["official-artwork"]?.front_default ||
              details.sprites?.front_default ||
              "https://via.placeholder.com/150?text=No+Image",
            })) 
          )
       ).then((itemsWithImages) => setItems( itemsWithImages));
    })
    .catch((err) => console.error("erro ao buscar dados:", err));
  }, []);

  return (
    <ul style={{ display: "flex", flexWrap: "wrap", gap: "20px"}}>
      {items.map((item, index) => (
      <li
        key={index}
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
          src={item.image}
          alt={item.name}
          style={{ width: "120px", height: "120px", objectFit: "contain"}}
        />
      <p style={{ marginTop: "10px", textTransform: "capitalize"}}>
      </p>
      </li>
      ))}
    </ul>
  );
}
const BASE_URL = "https://api.jikan.moe/v4/seasons/upcoming"; // <-- mudar aqui para sua API 
 
// Função para listar todos os itens
async function getItems() {
  const res = await fetch(`${BASE_URL}items`); // end point que ira utilizar
  const data = await res.json();
  return data;
}
 
// Função para pegar detalhes de um item
async function getItemById(id) {
  const res = await fetch(`${BASE_URL}items/${id}`);
  return await res.json();
}
 
export default { getItems, getItemById };
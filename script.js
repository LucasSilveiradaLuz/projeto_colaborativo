const baseURL = "https://thegreekmythapi.vercel.app/api";
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const godName = document.getElementById("godInput").value.trim().toLowerCase();
    const url = `${baseURL}/gods/${godName}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Não encontrado");
            return response.json();
        })
        .then(data => {
           
            document.getElementById("nome").innerText = data.name;       
            document.getElementById("dominio").innerText = data.domain;  
            document.getElementById("poderes").innerText = data.powers; 
            
           
        })
        .catch(err => console.error("Erro ao buscar no Olimpo:", err));
});

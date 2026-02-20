const searchBtn = document.getElementById("searchBtn");

const godInput = document.getElementById("godInput");
godInput.addEventListener("keypress", function(event) {
  // Verifica se a tecla pressionada foi "Enter"
  if (event.key === "Enter") {
    // Cancela o comportamento padrão (se necessário) e clica no botão
    // event.preventDefault();
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", () => {
    const godName = document
        .getElementById("godInput")
        .value
        .trim()
        .toLowerCase();

    fetch("db.json")
        .then(response => response.json())
        .then(data => {

            // IMPORTANTE: seu JSON tem "gods"
            const god = data.gods.find(g =>
                g.name.toLowerCase() === godName
            );

            if (!god) {
                throw new Error("Deus não encontrado");
            }

            // Atualiza dados
            document.getElementById("nome").innerText = god.name;
            document.getElementById("dominio").innerText = god.domain;
            document.getElementById("poderes").innerText = god.symbol;

            // 🔥 BUSCA IMAGEM NA WIKIPEDIA AUTOMATICAMENTE
            return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${god.name}`)
                .then(res => res.json())
                .then(wikiData => {

                    if (wikiData.thumbnail && wikiData.thumbnail.source) {
                        document.getElementById("imagem").src = wikiData.thumbnail.source;
                    } else {
                        document.getElementById("imagem").src =
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaIuyhIU_4sTcggWqJptRxBJ6o4YnqXqTr3A&s";
                    }
                });

        })
        .catch(err => {
            console.error("Erro:", err);
            alert("Deus não encontrado no Olimpo ⚡");
        });
});

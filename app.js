const container = document.getElementById("gamesContainer");
const searchInput = document.getElementById("search");

// Build full URL using BASE_URL
function getGameUrl(path) {
  return BASE_URL + path;
}

function renderGames(list) {
  container.innerHTML = "";

  list.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    const fullImageUrl = BASE_URL + game.image;
    const fullGameUrl = getGameUrl(game.path);

    card.innerHTML = `
      <img src="${fullImageUrl}" alt="${game.title}">
      <div class="content">
        <h3>${game.title}</h3>
        <p>${game.desc}</p>
      </div>
    `;

    card.onclick = () => {
      window.location.href = fullGameUrl;
    };

    container.appendChild(card);
  });
}

// Search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filtered = games.filter(game =>
    game.title.toLowerCase().includes(query) ||
    game.desc.toLowerCase().includes(query)
  );

  renderGames(filtered);
});

// Initial render
renderGames(games);
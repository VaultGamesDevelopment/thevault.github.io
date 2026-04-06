const container = document.getElementById("gamesContainer");
const searchInput = document.getElementById("searchInput");
const toggleDescBtn = document.getElementById("toggleDesc");
const toggleThemeBtn = document.getElementById("toggleTheme");

let showDescriptions = true;

/* Safety check */
if (!window.games || !window.BASE_URL) {
  console.error("games.js failed to load properly.");
}

/* Render */
function renderGames(list) {
  container.innerHTML = "";

  list.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    const img = window.BASE_URL + game.image;
    const url = window.BASE_URL + game.path;

    card.innerHTML = `
      <img src="${img}" onerror="this.style.display='none'" />
      <div class="game-content">
        <h3>${game.title}</h3>
        ${showDescriptions ? `<p>${game.desc}</p>` : ""}
      </div>
    `;

    card.onclick = () => {
  const fullUrl = window.BASE_URL + game.path;

  // open in iframe page
  window.location.href = `play.html?url=${encodeURIComponent(fullUrl)}`;
};

    container.appendChild(card);
  });
}

/* Search */
searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();

  const filtered = window.games.filter(g =>
    g.title.toLowerCase().includes(q) ||
    g.desc.toLowerCase().includes(q)
  );

  renderGames(filtered);
});

/* Toggle descriptions */
toggleDescBtn.onclick = () => {
  showDescriptions = !showDescriptions;
  renderGames(window.games);
};

/* Theme toggle */
toggleThemeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
};

/* Init */
renderGames(window.games);
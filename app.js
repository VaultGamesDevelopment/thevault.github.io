const container = document.getElementById("gamesContainer");
const searchInput = document.getElementById("searchInput");
const settingsBtn = document.getElementById("settingsBtn");
const modal = document.getElementById("settingsModal");

const themeSelect = document.getElementById("themeSelect");
const gridSizeSelect = document.getElementById("gridSizeSelect");
const toggleDesc = document.getElementById("toggleDesc");
const closeSettings = document.getElementById("closeSettings");

let settings = {
  theme: localStorage.getItem("theme") || "dark",
  gridSize: localStorage.getItem("gridSize") || "medium",
  showDesc: localStorage.getItem("showDesc") !== "false"
};

/* Apply Settings */
function applySettings() {
  document.body.className = settings.theme;
  container.className = `games-grid ${settings.gridSize}`;

  localStorage.setItem("theme", settings.theme);
  localStorage.setItem("gridSize", settings.gridSize);
  localStorage.setItem("showDesc", settings.showDesc);
}

/* Render Games */
function renderGames(filter = "") {
  container.innerHTML = "";

  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <img src="${game.image}" />
      <div class="content">
        <h3>${game.title}</h3>
        ${settings.showDesc ? `<p>${game.desc}</p>` : ""}
      </div>
    `;

    card.onclick = () => {
      window.location.href = game.url;
    };

    container.appendChild(card);
  });
}

/* Events */
searchInput.addEventListener("input", e => {
  renderGames(e.target.value);
});

settingsBtn.onclick = () => modal.classList.remove("hidden");
closeSettings.onclick = () => modal.classList.add("hidden");

/* Settings Controls */
themeSelect.value = settings.theme;
gridSizeSelect.value = settings.gridSize;
toggleDesc.checked = settings.showDesc;

themeSelect.onchange = e => {
  settings.theme = e.target.value;
  applySettings();
};

gridSizeSelect.onchange = e => {
  settings.gridSize = e.target.value;
  applySettings();
};

toggleDesc.onchange = e => {
  settings.showDesc = e.target.checked;
  applySettings();
};

/* Init */
applySettings();
renderGames();
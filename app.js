const BASE_URL = "https://biology.science.geometry.project.computer.archivomemoria-audiovisualcsb.org/";
const PROXY = "https://images.weserv.nl/?url=";

const settings = {
  showDesc: true,
  darkMode: true
};

function loadSettings() {
  const saved = localStorage.getItem("vault_settings");
  if (saved) Object.assign(settings, JSON.parse(saved));
}

function saveSettings() {
  localStorage.setItem("vault_settings", JSON.stringify(settings));
}

// Ensure games exist before rendering
function getGames() {
  if (!window.games || !Array.isArray(window.games)) {
    console.error("games.js failed to load or is invalid");
    return [];
  }
  return window.games;
}

function getImageUrl(path) {
  if (!path) return "";

  if (path.startsWith("http")) return path;

  return BASE_URL + path;
}

const container = document.getElementById("gamesContainer");
const searchInput = document.getElementById("searchInput");

function renderGames(filter = "") {
  const games = getGames();

  container.innerHTML = "";

  if (games.length === 0) {
    container.innerHTML = "<p>No games loaded. Check games.js</p>";
    return;
  }

  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    const img = document.createElement("img");
    img.src = getImageUrl(game.image);

    // fallback if blocked
    img.onerror = () => {
      img.onerror = null;
      img.src = PROXY + encodeURIComponent(getImageUrl(game.image));
    };

    const content = document.createElement("div");
    content.className = "game-content";

    const title = document.createElement("h3");
    title.textContent = game.title;

    content.appendChild(title);

    if (settings.showDesc) {
      const desc = document.createElement("p");
      desc.textContent = game.desc;
      content.appendChild(desc);
    }

    card.appendChild(img);
    card.appendChild(content);

    card.onclick = () => {
      if (game.url) window.location.href = game.url;
    };

    container.appendChild(card);
  });
}

// UI
document.getElementById("toggleDesc").onclick = () => {
  settings.showDesc = !settings.showDesc;
  saveSettings();
  renderGames(searchInput.value);
};

document.getElementById("toggleTheme").onclick = () => {
  settings.darkMode = !settings.darkMode;
  saveSettings();
  applyTheme();
};

searchInput.addEventListener("input", (e) => {
  renderGames(e.target.value);
});

function applyTheme() {
  document.body.className = settings.darkMode ? "dark" : "light";
}

// Init (wait until DOM + games are ready)
window.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  applyTheme();
  renderGames();
});
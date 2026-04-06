const BASE_URL = "https://biology.science.geometry.project.computer.archivomemoria-audiovisualcsb.org/";

// ------------------------
// SETTINGS
// ------------------------
const settings = {
  showDesc: true,
  darkMode: true
};

// Load settings from localStorage
function loadSettings() {
  const saved = localStorage.getItem("vault_settings");
  if (saved) {
    Object.assign(settings, JSON.parse(saved));
  }
}

// Save settings
function saveSettings() {
  localStorage.setItem("vault_settings", JSON.stringify(settings));
}

// ------------------------
// IMAGE FIX
// ------------------------
function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return BASE_URL + path;
}

// ------------------------
// RENDER UI
// ------------------------
const container = document.getElementById("gamesContainer");
const searchInput = document.getElementById("searchInput");
const toggleDescBtn = document.getElementById("toggleDesc");
const toggleThemeBtn = document.getElementById("toggleTheme");

function renderGames(filter = "") {
  container.innerHTML = "";

  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    const img = document.createElement("img");
    img.src = getImageUrl(game.image);

    img.onerror = () => {
      img.src = "https://via.placeholder.com/300x150?text=No+Image";
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
      window.location.href = game.url;
    };

    container.appendChild(card);
  });
}

// ------------------------
// EVENTS
// ------------------------
searchInput.addEventListener("input", (e) => {
  renderGames(e.target.value);
});

toggleDescBtn.addEventListener("click", () => {
  settings.showDesc = !settings.showDesc;
  saveSettings();
  renderGames(searchInput.value);
});

toggleThemeBtn.addEventListener("click", () => {
  settings.darkMode = !settings.darkMode;
  saveSettings();
  applyTheme();
});

// ------------------------
// THEME
// ------------------------
function applyTheme() {
  document.body.className = settings.darkMode ? "dark" : "light";
}

// ------------------------
// INIT
// ------------------------
loadSettings();
applyTheme();
renderGames();
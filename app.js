const BASE_URL = "https://biology.science.geometry.project.computer.archivomemoria-audiovisualcsb.org/";

// Optional proxy fallback (helps bypass hotlink blocking)
const PROXY = "https://images.weserv.nl/?url=";

// Settings
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

// Fix image URLs + fallback proxy
function getImageUrl(path) {
  if (!path) return "";

  // Absolute URL
  if (path.startsWith("http")) return path;

  const direct = BASE_URL + path;

  // Proxy fallback (encoded)
  const proxyUrl = PROXY + encodeURIComponent(direct);

  return direct; // start with direct
}

// Render
const container = document.getElementById("gamesContainer");
const searchInput = document.getElementById("searchInput");

function renderGames(filter = "") {
  container.innerHTML = "";

  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    const img = document.createElement("img");

    const directUrl = getImageUrl(game.image);

    // Try direct first
    img.src = directUrl;

    // If fails → fallback proxy
    img.onerror = () => {
      img.onerror = null;
      img.src = "https://images.weserv.nl/?url=" + encodeURIComponent(BASE_URL + game.image);
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

// UI Controls
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

// Theme
function applyTheme() {
  document.body.className = settings.darkMode ? "dark" : "light";
}

// Init
loadSettings();
applyTheme();
renderGames();
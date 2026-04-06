const container = document.getElementById("gamesContainer");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("settingsModal");
const openSettings = document.getElementById("openSettings");
const closeSettings = document.getElementById("closeSettings");

const themeSelect = document.getElementById("themeSelect");
const fxSelect = document.getElementById("fxSelect");

const canvas = document.getElementById("fxCanvas");
const ctx = canvas.getContext("2d");

let gamesData = [];
let fxMode = "none";

/* Resize canvas */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.onresize = resizeCanvas;
resizeCanvas();

/* Fetch Gamepix games */
async function loadGames() {
  const res = await fetch("https://feeds.gamepix.com/v2/json?sid=1&pagination=24&order=quality");
  const data = await res.json();

  gamesData = data.items;
  renderGames(gamesData);
}

/* Render games */
function renderGames(list) {
  container.innerHTML = "";

  list.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <img src="${game.image}" width="100%" />
      <h3>${game.title}</h3>
    `;

    card.onclick = () => {
      openGame(game);
    };

    container.appendChild(card);
  });
}

/* Open game in iframe */
function openGame(game) {
  container.innerHTML = "";

  const iframe = document.createElement("iframe");
  iframe.src = game.url;
  iframe.style.width = "100%";
  iframe.style.height = "90vh";
  iframe.style.border = "none";

  container.appendChild(iframe);
}

/* Search */
searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();

  const filtered = gamesData.filter(g =>
    g.title.toLowerCase().includes(q) ||
    g.description.toLowerCase().includes(q)
  );

  renderGames(filtered);
});

/* Settings modal */
openSettings.onclick = () => modal.classList.remove("hidden");
closeSettings.onclick = () => modal.classList.add("hidden");

/* Theme */
themeSelect.onchange = (e) => {
  document.body.className = e.target.value;
};

/* Weather FX toggle */
fxSelect.onchange = (e) => {
  fxMode = e.target.value;
};

/* FX System */
let particles = [];

function spawnParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 2 + 1
    });
  }
}

function animateFX() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (fxMode === "rain") {
    particles.forEach(p => {
      p.y += p.speed * 4;
      if (p.y > canvas.height) p.y = 0;

      ctx.fillRect(p.x, p.y, 2, 10);
    });
  }

  if (fxMode === "snow") {
    particles.forEach(p => {
      p.y += p.speed;
      p.x += Math.sin(p.y * 0.01);

      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  requestAnimationFrame(animateFX);
}

spawnParticles();
animateFX();

/* Init */
loadGames();
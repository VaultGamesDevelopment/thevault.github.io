const FEED_URL = "https://feeds.gamepix.com/v2/json?order=quality&page=1&pagination=24&sid=1";

const gamesContainer = document.getElementById("games");
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const closeSettings = document.getElementById("closeSettings");
const themeSelect = document.getElementById("themeSelect");
const weatherSelect = document.getElementById("weatherSelect");

// ✅ Prevent null errors
window.addEventListener("DOMContentLoaded", () => {

  // Settings button
  settingsBtn.onclick = () => {
    settingsPanel.classList.remove("hidden");
  };

  closeSettings.onclick = () => {
    settingsPanel.classList.add("hidden");
  };

  // Theme switch
  themeSelect.onchange = () => {
    document.body.setAttribute("data-theme", themeSelect.value);
  };

  // Weather FX toggle
  weatherSelect.onchange = () => {
    setWeather(weatherSelect.value);
  };

  loadGames();
});

async function loadGames() {
  try {
    const res = await fetch(FEED_URL);
    const data = await res.json();

    gamesContainer.innerHTML = "";

    data.items.forEach(game => {
      const div = document.createElement("div");
      div.className = "game-card";

      div.innerHTML = `
        <img src="${game.image}">
        <h3>${game.title}</h3>
        <button onclick="playGame('${game.namespace}')">Play</button>
      `;

      gamesContainer.appendChild(div);
    });

  } catch (err) {
    console.error("Failed to load games:", err);
    gamesContainer.innerHTML = "Failed to load games.";
  }
}

function playGame(namespace) {
  localStorage.setItem("gameNamespace", namespace);
  window.location.href = "play.html";
}

/* ---------------- WEATHER FX ---------------- */

function setWeather(type) {
  document.getElementById("weatherCanvas")?.remove();

  if (type === "none") return;

  const canvas = document.createElement("canvas");
  canvas.id = "weatherCanvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 3 + 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.y += p.speed;

      if (p.y > canvas.height) p.y = 0;

      ctx.fillStyle = type === "rain" ? "rgba(173,216,230,0.6)" : "#fff";
      ctx.fillRect(p.x, p.y, 2, 10);
    });

    requestAnimationFrame(animate);
  }

  animate();
}
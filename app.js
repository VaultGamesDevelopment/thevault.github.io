function renderGames() {
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";

  games.forEach(game => {
    const el = document.createElement("div");
    el.className = "card";

    el.innerHTML = `
      <img src="${game.image}" onerror="this.src='https://via.placeholder.com/300x150'"/>
      <h3>${game.title}</h3>
    `;

    el.onclick = () => openGame(game);

    grid.appendChild(el);
  });
}

function openGame(game) {
  const cloak = UI.getCloak();

  if (cloak === "about") {
    const w = window.open("about:blank");
    w.document.write(`<iframe src="${game.url}" style="border:none;width:100%;height:100%"></iframe>`);
    return;
  }

  if (cloak === "blob") {
    const blob = new Blob([`<iframe src="${game.url}" style="border:none;width:100%;height:100%"></iframe>`], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url);
    return;
  }

  const viewer = document.getElementById("gameViewer");
  const frame = document.getElementById("gameFrame");

  frame.src = game.url;
  viewer.style.display = "flex";
}

function closeGame() {
  document.getElementById("gameViewer").style.display = "none";
}

function toggleFullscreen() {
  document.getElementById("gameFrame").requestFullscreen();
}

document.addEventListener("DOMContentLoaded", () => {
  UI.init();
  renderGames();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeGame();
    document.getElementById("settingsModal").style.display = "none";
  }
  if (e.key === "f") toggleFullscreen();
});
function renderGames() {
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";

  games.forEach(game => {
    const el = document.createElement("div");
    el.className = "card";

    const img = document.createElement("img");

    img.src = game.image;

    // Prevent infinite fallback loop
    let fallbackUsed = false;

    img.onerror = () => {
      if (fallbackUsed) return;
      fallbackUsed = true;

      img.src = "assets/images/fallback.png"; // local fallback recommended
    };

    const title = document.createElement("h3");
    title.textContent = game.title;

    el.onclick = () => openGame(game);

    el.appendChild(img);
    el.appendChild(title);

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
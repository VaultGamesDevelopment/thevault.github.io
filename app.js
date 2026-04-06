const BASE = "https://biology.science.geometry.project.computer.archivomemoria-audiovisualcsb.org/";

function renderGames() {
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";

  games.forEach(game => {
    const el = document.createElement("div");
    el.className = "card";

    const img = document.createElement("img");
    img.src = BASE + game.image;

    img.onerror = () => {
      img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='150'><rect width='100%' height='100%' fill='#111'/></svg>";
    };

    const title = document.createElement("h3");
    title.textContent = game.title;

    el.appendChild(img);
    el.appendChild(title);

    el.onclick = () => openGame(game);

    grid.appendChild(el);
  });
}

function openGame(game) {
  const fullUrl = BASE + game.url;

  document.getElementById("gameFrame").src = fullUrl;
  document.getElementById("gameViewer").style.display = "flex";
}

function closeGame() {
  document.getElementById("gameViewer").style.display = "none";
}

function toggleFullscreen() {
  document.getElementById("gameFrame").requestFullscreen();
}

/* CLOAK SYSTEM */
function launchCloaked() {
  const cloak = localStorage.getItem("cloak");

  if (!cloak || cloak === "none") return;

  const url = location.href;

  if (cloak === "about") {
    const win = window.open("about:blank");
    win.document.write(`<iframe src="${url}" style="width:100%;height:100%;border:none"></iframe>`);
  }

  if (cloak === "blob") {
    const blob = new Blob([`<iframe src="${url}" style="width:100%;height:100%;border:none"></iframe>`], { type: "text/html" });
    window.open(URL.createObjectURL(blob));
  }

  document.body.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
  UI.init();
  renderGames();

  setTimeout(launchCloaked, 300);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeGame();
  if (e.key === "f") toggleFullscreen();
});
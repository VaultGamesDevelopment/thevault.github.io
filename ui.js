function renderGames(){
  const container = document.getElementById("gameContainer");
  container.innerHTML = "";

  GAMES.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <img src="${game.image}" onerror="this.style.display='none'"/>
      <div class="info">
        <h3>${game.title}</h3>
      </div>
    `;

    card.onclick = () => openGame(game.url);

    container.appendChild(card);
  });
}

function openGame(url){
  const container = document.getElementById("gameContainer");

  container.innerHTML = `
    <iframe id="gameFrame" src="${url}" allowfullscreen></iframe>
  `;
}

function openSettings(){
  document.getElementById("settingsModal").classList.remove("hidden");
}

function closeSettings(){
  document.getElementById("settingsModal").classList.add("hidden");
}

function toggleFullscreen(){
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
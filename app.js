function renderGames(){
  const grid=document.getElementById("gameGrid");
  grid.innerHTML="";

  games.forEach(g=>{
    grid.innerHTML+=`
      <div class="card" onclick="openGame(${JSON.stringify(g)})">
        <img src="${BASE+g.image}">
        <div style="padding:8px">${g.title}</div>
      </div>
    `;
  });
}

function openGame(game){
  document.getElementById("gameFrame").src=BASE+game.url;
  document.getElementById("gameViewer").style.display="flex";
}

function closeGame(){
  document.getElementById("gameViewer").style.display="none";
}

function toggleFullscreen(){
  document.getElementById("gameFrame").requestFullscreen();
}

function renderFavorites(){
  const el=document.getElementById("favorites");
  el.innerHTML="<h3>Favorites</h3>";

  State.favorites.forEach(g=>{
    el.innerHTML+=`<div>${g.title}</div>`;
  });
}

/* CLOAK */
function cloak(){
  const mode=localStorage.getItem("cloak");

  if(mode==="about"){
    const w=window.open("about:blank");
    w.document.write(`<iframe src="${location.href}" style="width:100%;height:100%;border:none"></iframe>`);
  }

  if(mode==="blob"){
    const blob=new Blob([`<iframe src="${location.href}" style="width:100%;height:100%;border:none"></iframe>`]);
    window.open(URL.createObjectURL(blob));
  }

  document.body.innerHTML="";
}

/* ALT + R RESET */
document.addEventListener("keydown",e=>{
  if(e.altKey && e.key==="r"){
    localStorage.clear();
    location.reload();
  }

  if(e.key==="Escape") closeGame();
  if(e.key==="f") toggleFullscreen();
});

/* INIT */
document.addEventListener("DOMContentLoaded",()=>{
  UI.setTheme(localStorage.getItem("theme")||"dark");
  UI.setWeather(localStorage.getItem("weather")||"none");
  UI.applyExtras();

  renderGames();
  renderFavorites();

  setTimeout(cloak,300);
});
window.BASE="https://biology.science.geometry.project.computer.archivomemoria-audiovisualcsb.org/";

let debounce;

function renderGames(){
  const grid=document.getElementById("gameGrid");
  grid.innerHTML="";

  let filtered=games.filter(g =>
    g.title.toLowerCase().includes(State.search.toLowerCase())
  );

  filtered.forEach(g=>{
    grid.innerHTML+=Components.gameCard(g);
  });
}

/* SEARCH */
document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("searchInput").addEventListener("input",e=>{
    clearTimeout(debounce);
    debounce=setTimeout(()=>{
      State.search=e.target.value;
      renderGames();
    },200);
  });
});

/* GAME */
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

/* CLOAK */
function launchCloak(){
  const cloak=localStorage.getItem("cloak");
  if(!cloak||cloak==="none") return;

  const url=location.href;

  if(cloak==="about"){
    const w=window.open("about:blank");
    w.document.write(`<iframe src="${url}" style="width:100%;height:100%;border:none"></iframe>`);
  }

  if(cloak==="blob"){
    const blob=new Blob([`<iframe src="${url}" style="width:100%;height:100%;border:none"></iframe>`],{type:"text/html"});
    window.open(URL.createObjectURL(blob));
  }

  document.body.innerHTML="";
}

/* ALT+R RESET */
document.addEventListener("keydown",e=>{
  if(e.altKey && e.key.toLowerCase()==="r"){
    localStorage.clear();
    alert("Vault reset.");
    location.reload();
  }

  if(e.key==="Escape") closeGame();
  if(e.key==="f") toggleFullscreen();
});

/* INIT */
document.addEventListener("DOMContentLoaded",()=>{
  UI.init();
  renderGames();
  UI.renderFavorites();

  setTimeout(launchCloak,300);
});
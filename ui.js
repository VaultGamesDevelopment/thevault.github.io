const UI={
  init(){
    this.setTheme(localStorage.getItem("theme")||"dark");
    this.setWeather(localStorage.getItem("weather")||"none");
  },

  setTheme(theme){
    document.body.className=theme;
    localStorage.setItem("theme",theme);
  },

  setWeather(w){
    const fx=document.getElementById("weatherFx");
    fx.className="weather-bg";
    if(w!=="none") fx.classList.add(w);
    localStorage.setItem("weather",w);
  },

  renderFavorites(){
    const el=document.getElementById("favorites");
    el.innerHTML="<h3>Favorites</h3>";

    State.favorites.forEach(g=>{
      el.innerHTML+=`<div onclick='openGame(${JSON.stringify(g)})'>${g.title}</div>`;
    });
  }
};
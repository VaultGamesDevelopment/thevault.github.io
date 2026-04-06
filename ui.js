const UI = {

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

  applyExtras(){
    const density=localStorage.getItem("density");
    const blur=localStorage.getItem("blur");
    const animation=localStorage.getItem("animation");

    document.body.style.fontSize = density==="compact" ? "13px":"16px";

    if(animation==="off"){
      document.body.style.animation="none";
    }

    if(blur==="low"){
      document.documentElement.style.setProperty("--card","rgba(255,255,255,0.03)");
    }
    if(blur==="high"){
      document.documentElement.style.setProperty("--card","rgba(255,255,255,0.1)");
    }
  }
};
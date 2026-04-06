const UI = {
  init() {
    this.setTheme(localStorage.getItem("theme") || "dark");
    this.setWeather(localStorage.getItem("weather") || "none");
  },

  setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  },

  setWeather(weather) {
    const fx = document.getElementById("weatherFx");
    fx.className = "weather-bg";

    if (weather !== "none") fx.classList.add(weather);

    localStorage.setItem("weather", weather);
  },

  getCloak() {
    return localStorage.getItem("cloak") || "none";
  }
};
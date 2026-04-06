const UI = {
  init() {
    this.applySavedTheme();
    this.applySavedWeather();
  },

  setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);

    const accents = {
      dark: "#7c5cff",
      light: "#4f46e5",
      ocean: "#00d4ff",
      fire: "#ff7a00"
    };

    document.documentElement.style.setProperty("--accent", accents[theme]);
  },

  applySavedTheme() {
    const theme = localStorage.getItem("theme") || "dark";
    this.setTheme(theme);
  },

  setWeather(weather) {
    const fx = document.getElementById("weatherFx");
    fx.className = "weather-bg " + weather;
    localStorage.setItem("weather", weather);
  },

  applySavedWeather() {
    const weather = localStorage.getItem("weather") || "none";
    document.getElementById("weatherFx").className = "weather-bg " + weather;
  },

  getCloak() {
    return localStorage.getItem("cloak") || "none";
  }
};
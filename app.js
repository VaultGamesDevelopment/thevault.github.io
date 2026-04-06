// app.js

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Load UI
    if (typeof renderGames === "function") {
      renderGames();
    }

    // Initialize settings dropdowns
    if (typeof initSettingsUI === "function") {
      initSettingsUI();
    }

    // Apply saved settings (if any)
    loadSavedSettings();

    // Register keyboard shortcuts
    registerHotkeys();

  } catch (err) {
    console.error("App initialization error:", err);
  }
});


// ---------- SETTINGS LOADING ----------
function loadSavedSettings(){
  const theme = localStorage.getItem("theme");
  const weather = localStorage.getItem("weather");

  if (theme && document.getElementById("themeSelect")) {
    document.getElementById("themeSelect").value = theme;
  }

  if (weather && typeof setWeather === "function") {
    setWeather(weather);
    if (document.getElementById("weatherSelect")) {
      document.getElementById("weatherSelect").value = weather;
    }
  }
}


// ---------- APPLY SETTINGS ----------
window.applySettings = function(){
  const themeSelect = document.getElementById("themeSelect");
  const weatherSelect = document.getElementById("weatherSelect");

  const theme = themeSelect ? themeSelect.value : "dark";
  const weather = weatherSelect ? weatherSelect.value : "none";

  // Save
  localStorage.setItem("theme", theme);
  localStorage.setItem("weather", weather);

  // Apply theme
  if (typeof THEMES !== "undefined") {
    const t = THEMES[theme];
    if (t) {
      document.documentElement.style.setProperty("--bg", t.bg);
      document.documentElement.style.setProperty("--card", t.card);
    }
  }

  // Apply weather
  if (typeof setWeather === "function") {
    setWeather(weather);
  }

  // Close modal
  if (typeof closeSettings === "function") {
    closeSettings();
  }
};


// ---------- FULLSCREEN ----------
window.toggleFullscreen = function(){
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn("Fullscreen failed:", err);
    });
  } else {
    document.exitFullscreen();
  }
};


// ---------- SETTINGS MODAL ----------
window.openSettings = function(){
  const modal = document.getElementById("settingsModal");
  if (modal) modal.classList.remove("hidden");
};

window.closeSettings = function(){
  const modal = document.getElementById("settingsModal");
  if (modal) modal.classList.add("hidden");
};


// ---------- HOTKEYS ----------
function registerHotkeys(){
  document.addEventListener("keydown", (e) => {
    // ESC exits fullscreen or closes modal
    if (e.key === "Escape") {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        closeSettings();
      }
    }

    // Alt + R = reset settings
    if (e.altKey && e.key.toLowerCase() === "r") {
      resetSettings();
    }
  });
}


// ---------- RESET SETTINGS ----------
function resetSettings(){
  localStorage.removeItem("theme");
  localStorage.removeItem("weather");
  localStorage.removeItem("density");
  localStorage.removeItem("animation");

  // Reset UI selections if they exist
  const themeSelect = document.getElementById("themeSelect");
  const weatherSelect = document.getElementById("weatherSelect");

  if (themeSelect) themeSelect.selectedIndex = 0;
  if (weatherSelect) weatherSelect.selectedIndex = 0;

  // Reapply defaults
  if (typeof setWeather === "function") {
    setWeather("none");
  }

  // Reset theme to default
  document.documentElement.style.setProperty("--bg", "#0b0f1a");
  document.documentElement.style.setProperty("--card", "rgba(255,255,255,0.05)");

  console.log("Settings reset via Alt+R");
}
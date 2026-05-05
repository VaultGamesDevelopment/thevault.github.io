const Vault = (() => {

  let games = [];
  let favorites = JSON.parse(localStorage.getItem("vault_favs") || "[]");
  const CACHE = "vault_cache_pro_v2";

  /* ================= INIT ================= */
  function init() {

    document.addEventListener("DOMContentLoaded", () => {

      document.getElementById("search")
        .addEventListener("input", e => render(e.target.value));

      bind();
      load();
    });
  }

  /* ================= EVENT SYSTEM ================= */
  function bind() {

    document.addEventListener("click", (e) => {

      const el = e.target;

      if (el.dataset.action) handle(el.dataset.action);
      if (el.dataset.theme) theme(el.dataset.theme);
    });
  }

  function handle(action) {

    const map = {
      "settings": toggleSettings,
      "cloak-google": () => cloak("google"),
      "cloak-drive": () => cloak("drive"),
      "cloak-classroom": () => cloak("classroom"),
      "cloak-wiki": () => cloak("wiki"),
      "cloak-canvas": () => cloak("canvas"),
      "cloak-about": () => cloak("about"),
      "cloak-none": () => cloak("none"),
    };

    map[action]?.();
  }

  /* ================= FAST CACHE LOAD ================= */
  async function load() {

    const cached = localStorage.getItem(CACHE);

    if (cached) {
      games = JSON.parse(cached);
      render("");
      return;
    }

    const res = await fetch("https://archive.org/download/ugsfiles/");
    const html = await res.text();

    const doc = new DOMParser().parseFromString(html, "text/html");

    games = [...doc.querySelectorAll("a")]
      .map(a => a.href)
      .filter(h => h.endsWith(".html"))
      .map(h => ({
        name: h.split("/").pop().replace(".html",""),
        url: h
      }));

    localStorage.setItem(CACHE, JSON.stringify(games));
    render("");
  }

  /* ================= RENDER ENGINE ================= */
  function render(q="") {

    const grid = document.getElementById("grid");
    if (!grid) return;

    grid.innerHTML = "";

    games
      .filter(g => g.name.toLowerCase().includes(q.toLowerCase()))
      .forEach(g => {

        const card = document.createElement("div");
        card.className = "card";

        const star = document.createElement("div");
        star.className = "star";
        star.textContent = "★";

        if (favorites.includes(g.name)) {
          star.classList.add("active");
        }

        star.onclick = (e) => {
          e.stopPropagation();

          favorites = favorites.includes(g.name)
            ? favorites.filter(f => f !== g.name)
            : [...favorites, g.name];

          localStorage.setItem("vault_favs", JSON.stringify(favorites));
          render(q);
        };

        card.innerHTML = `<div>${g.name}</div>`;
        card.appendChild(star);

        card.onclick = () => window.open(g.url, "_blank");

        grid.appendChild(card);
      });
  }

  /* ================= CLOAK SYSTEM ================= */
  function cloak(mode) {

    const map = {
      google: ["Google", "https://www.google.com/favicon.ico"],
      drive: ["My Drive", "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"],
      classroom: ["Google Classroom", "https://ssl.gstatic.com/classroom/favicon.png"],
      wiki: ["Wikipedia", "https://www.wikipedia.org/favicon.ico"],
      canvas: ["Canvas", "https://www.instructure.com/favicon.ico"]
    };

    if (mode === "about") {
      const w = window.open("about:blank", "_blank");
      w.document.write("<title>Vault OS</title><h1>Vault</h1>");
      return;
    }

    if (mode === "none") {
      document.title = "Vault OS";
      return;
    }

    const [title, icon] = map[mode] || [];

    document.title = title;

    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = icon;
  }

  /* ================= THEMES ================= */
  function theme(t) {

    const root = document.documentElement;

    const themes = {
      midnight: ["#0a0a0a", "#8a2be2"],
      space: ["#050510", "#00d2ff"],
      matrix: ["#000", "#00ff99"],
      void: ["#000", "#ff3366"]
    };

    const [bg, accent] = themes[t];

    root.style.setProperty("--bg", bg);
    root.style.setProperty("--accent", accent);
  }

  /* ================= SETTINGS ================= */
  function toggleSettings() {
    document.getElementById("settings")
      .classList.toggle("hidden");
  }

  function clearCache() {
    localStorage.removeItem(CACHE);
    location.reload();
  }

  /* EXPOSE */
  return {
    init,
    cloak,
    theme,
    toggleSettings,
    clearCache
  };

})();

/* GLOBAL SAFE */
window.Vault = Vault;

/* BOOT */
Vault.init();
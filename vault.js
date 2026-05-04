const Vault = (() => {

  let games = [];
  let favorites = JSON.parse(localStorage.getItem("fav") || "[]");
  let cacheKey = "vault_cache_v3";

  const grid = () => document.getElementById("grid");
  const search = () => document.getElementById("search");

  /* ================= LOAD ================= */
  async function load() {

    const cached = localStorage.getItem(cacheKey);

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

    localStorage.setItem(cacheKey, JSON.stringify(games));
    render("");
  }

  /* ================= RENDER ================= */
  function render(q="") {

    const g = grid();
    g.innerHTML = "";

    games
      .filter(x => x.name.toLowerCase().includes(q.toLowerCase()))
      .forEach(game => {

        const card = document.createElement("div");
        card.className = "card";

        const star = document.createElement("div");
        star.className = "star";
        star.textContent = "★";

        if (favorites.includes(game.name)) {
          star.classList.add("active");
        }

        star.onclick = (e) => {
          e.stopPropagation();

          if (favorites.includes(game.name)) {
            favorites = favorites.filter(f => f !== game.name);
          } else {
            favorites.push(game.name);
          }

          localStorage.setItem("fav", JSON.stringify(favorites));
          render(search().value);
        };

        card.innerHTML = `<div>${game.name}</div>`;
        card.appendChild(star);

        card.onclick = () => {
          window.open(game.url, "_blank");
        };

        g.appendChild(card);
      });
  }

  /* ================= CLOAK ================= */
  function cloak(mode) {

    const map = {
      google: ["Google", "https://www.google.com/favicon.ico"],
      drive: ["My Drive", "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"],
      classroom: ["Google Classroom", "https://ssl.gstatic.com/classroom/favicon.png"],
      canvas: ["Canvas", "https://www.instructure.com/favicon.ico"],
      wiki: ["Wikipedia", "https://www.wikipedia.org/favicon.ico"]
    };

    if (mode === "none") {
      document.title = "Vault";
      return;
    }

    if (mode === "about") {
      const w = window.open("about:blank", "_blank");
      w.document.write("<h1>Vault</h1>");
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

  /* ================= SEARCH ================= */
  function init() {
    search().addEventListener("input", e => {
      render(e.target.value);
    });

    load();
  }

  return {
    init,
    cloak,
    theme,
    toggleSettings
  };

})();

/* boot */
window.addEventListener("DOMContentLoaded", Vault.init);

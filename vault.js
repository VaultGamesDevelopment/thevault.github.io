const svgObj = document.getElementById("ui");

let CACHE_KEY = "vault_cache_v1";
let favorites = JSON.parse(localStorage.getItem("vault_favs") || "[]");
let games = [];

/* =============================
   CACHE SYSTEM (FAST LOAD)
============================= */
async function loadGames() {
  const cached = localStorage.getItem(CACHE_KEY);

  if (cached) {
    games = JSON.parse(cached);
    render("");
    return;
  }

  const res = await fetch("https://archive.org/download/ugsfiles/");
  const html = await res.text();

  const doc = new DOMParser().parseFromString(html, "text/html");

  const list = [...doc.querySelectorAll("a")]
    .map(a => a.href)
    .filter(h => h.endsWith(".html"))
    .map(h => ({
      name: h.split("/").pop().replace(".html",""),
      file: h
    }));

  games = list;

  localStorage.setItem(CACHE_KEY, JSON.stringify(list));
  render("");
}

/* =============================
   FAVORITES
============================= */
function toggleFav(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter(f => f !== name);
  } else {
    favorites.push(name);
  }

  localStorage.setItem("vault_favs", JSON.stringify(favorites));
  render(lastQuery);
}

function isFav(name) {
  return favorites.includes(name);
}

/* =============================
   SEARCH (REAL TIME)
============================= */
let lastQuery = "";

function search(q) {
  lastQuery = (q || "").toLowerCase();
  render(lastQuery);
}

/* expose */
window.handleSearch = search;

/* =============================
   RENDER ENGINE
============================= */
function render(query = "") {
  const svg = svgObj.contentDocument;
  const grid = svg.getElementById("grid");

  grid.innerHTML = "";

  let x = 250, y = 120, col = 0;

  games.forEach(g => {
    if (query && !g.name.toLowerCase().includes(query)) return;

    const el = svg.createElementNS("http://www.w3.org/2000/svg","g");

    el.setAttribute("class","card");

    el.innerHTML = `
      <rect x="${x}" y="${y}" width="180" height="120" rx="12" fill="#1A1A1A"/>
      <text x="${x+10}" y="${y+110}" fill="#ccc">${g.name}</text>

      <circle cx="${x+165}" cy="${y+15}" r="7"
              fill="${isFav(g.name) ? '#8a2be2' : '#444'}"/>
    `;

    el.addEventListener("click", () => {
      window.open(g.file, "_blank");
    });

    setTimeout(() => {
      const star = el.querySelector("circle");
      star.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFav(g.name);
      });
    }, 0);

    grid.appendChild(el);

    col++;
    x += 200;

    if (col >= 4) {
      col = 0;
      x = 250;
      y += 140;
    }
  });
}

/* =============================
   CLOAK SYSTEM
============================= */
function cloak(mode) {
  const map = {
    google: ["Google", "https://www.google.com/favicon.ico"],
    classroom: ["Google Classroom", "https://ssl.gstatic.com/classroom/favicon.png"],
    drive: ["My Drive", "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"]
  };

  if (!map[mode]) return;

  document.title = map[mode][0];

  let link = document.querySelector("link[rel='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = map[mode][1];
}

window.handleCloak = cloak;

/* =============================
   INIT
============================= */
svgObj.addEventListener("load", loadGames);

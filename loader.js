const svgObj = document.getElementById("ui");

let games = [];
let favorites = JSON.parse(localStorage.getItem("vault_favs") || "[]");
let lastSearch = "";

/* ==============================
   FETCH ARCHIVE GAME LIST
============================== */
async function loadArchiveGames() {
  const res = await fetch("https://archive.org/download/ugsfiles/");
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const links = [...doc.querySelectorAll("a")]
    .map(a => a.getAttribute("href"))
    .filter(h => h && h.endsWith(".html"));

  games = links.map(file => ({
    name: file.replace(".html", ""),
    file
  }));

  render("");
}

/* ==============================
   FAVORITES
============================== */
function toggleFav(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter(f => f !== name);
  } else {
    favorites.push(name);
  }
  localStorage.setItem("vault_favs", JSON.stringify(favorites));
  render(lastSearch);
}

function isFav(name) {
  return favorites.includes(name);
}

/* ==============================
   SEARCH
============================== */
function render(query = "") {
  lastSearch = query.toLowerCase();

  const svg = svgObj.contentDocument;
  const grid = svg.getElementById("grid");

  grid.innerHTML = "";

  let x = 250;
  let y = 120;
  let col = 0;

  games.forEach(g => {

    if (query && !g.name.toLowerCase().includes(query)) return;

    const group = svg.createElementNS("http://www.w3.org/2000/svg", "g");

    group.setAttribute("class", "card");

    group.innerHTML = `
      <rect x="${x}" y="${y}" width="180" height="120" rx="12" fill="#1A1A1A"/>
      <text x="${x+10}" y="${y+110}" fill="#ccc">${g.name}</text>

      <circle cx="${x+165}" cy="${y+15}" r="7"
              fill="${isFav(g.name) ? '#8C5AFF' : '#444'}"/>
    `;

    /* launch game */
    group.addEventListener("click", () => {
      window.open("https://archive.org/download/ugsfiles/" + g.file, "_blank");
    });

    /* favorite toggle */
    setTimeout(() => {
      const star = group.querySelector("circle");

      star.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFav(g.name);
      });
    }, 0);

    grid.appendChild(group);

    col++;
    x += 200;

    if (col >= 4) {
      col = 0;
      x = 250;
      y += 140;
    }
  });
}

/* expose search */
window.handleSearch = render;

/* init */
svgObj.addEventListener("load", loadArchiveGames);

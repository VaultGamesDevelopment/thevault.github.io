const SID = "1";
let next = `https://feeds.gamepix.com/v2/json?sid=${SID}&order=quality&pagination=48`;

const games = document.getElementById("games");

async function loadGames() {
    const res = await fetch(next);
    if (!res.ok) return;

    const data = await res.json();
    if (!data.items) return;

    data.items.forEach(g => {
        const c = document.createElement("div");
        c.className = "card";

        c.innerHTML = `
            <img src="${g.banner_image}">
            <div style="padding:8px">${g.title}</div>
        `;

        c.onclick = () => openGame(g.namespace);

        games.appendChild(c);
    });

    next = data.next_url;
}

function openGame(ns) {
    document.getElementById("gamePanel").style.display = "flex";
    document.getElementById("frame").src =
        `https://play.gamepix.com/${ns}/embed?sid=${SID}`;
}

function closeGame() {
    document.getElementById("gamePanel").style.display = "none";
    document.getElementById("frame").src = "";
}

/* VIEWS */
function showView(id) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* SEARCH */
function filterGames() {
    const q = search.value.toLowerCase();
    document.querySelectorAll(".card").forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
}

/* SETTINGS */
function openSettings(){ settings.style.display="block"; overlay.style.display="block"; }
function closeSettings(){ settings.style.display="none"; overlay.style.display="none"; }

/* THEME */
function setTheme(t){ document.documentElement.setAttribute("data-theme",t); }

/* MUSIC */
const music = document.getElementById("music");
function toggleMusic(){ music.paused ? music.play() : music.pause(); }

/* INIT */
loadGames();
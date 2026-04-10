const API = "https://feeds.gamepix.com/v2/json?sid=1&order=quality&pagination=48";

let gamesData = [];

async function loadGames() {
    try {
        const res = await fetch(API);
        const data = await res.json();

        if (!data?.items) {
            console.error("API error:", data);
            return;
        }

        gamesData = data.items;

        renderGames(gamesData);

    } catch (err) {
        console.error("Fetch failed", err);
    }
}

function renderGames(list) {
    const grid = document.getElementById("games");
    grid.innerHTML = "";

    list.forEach(g => {
        const el = document.createElement("div");
        el.className = "card";
        el.dataset.name = g.title.toLowerCase();

        el.onclick = () => {
            document.getElementById("frame").innerHTML = `
                <iframe src="https://play.gamepix.com/${g.namespace}/embed?sid=1"
                style="width:100%;height:100%;border:none"></iframe>
            `;
            document.getElementById("gameView").style.display = "block";
        };

        el.innerHTML = `
            <img src="${g.banner_image}">
            <div style="padding:10px">${g.title}</div>
        `;

        grid.appendChild(el);
    });
}

function filterGames() {
    const q = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".card").forEach(c => {
        c.style.display = c.dataset.name.includes(q) ? "block" : "none";
    });
}

function showPage(p) {
    document.querySelectorAll(".page").forEach(x => x.classList.remove("active"));
    document.getElementById(p).classList.add("active");
}

function closeGame() {
    document.getElementById("gameView").style.display = "none";
}

function toggleSettings() {
    const s = document.getElementById("settings");
    s.style.display = s.style.display === "block" ? "none" : "block";
}

/* THEMES */
function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
}

/* WEATHER */
function setWeather(type) {
    const w = document.getElementById("weather");
    w.innerHTML = "";

    if (type === "none") return;

    for (let i = 0; i < 80; i++) {
        const d = document.createElement("div");
        d.className = "weather-item";
        d.style.left = Math.random() * 100 + "%";
        d.style.animationDuration = (Math.random() * 2 + 2) + "s";

        if (type === "rain") {
            d.style.width = "2px";
            d.style.height = "20px";
            d.style.background = "white";
        }

        if (type === "snow") {
            d.style.width = "6px";
            d.style.height = "6px";
            d.style.background = "white";
            d.style.borderRadius = "50%";
        }

        w.appendChild(d);
    }
}

/* MUSIC */
function toggleMusic() {
    const m = document.getElementById("music");
    m.paused ? m.play() : m.pause();
}

window.onload = loadGames;
const SID = "1";
const grid = document.getElementById("games");

let next = `https://feeds.gamepix.com/v2/json?sid=${SID}&order=quality&pagination=48`;

async function loadGames() {
    try {
        const res = await fetch(next);

        if (!res.ok) {
            console.error("GamePix blocked request:", res.status);
            return;
        }

        const data = await res.json();

        if (!data.items) return;

        data.items.forEach(g => {
            const div = document.createElement("div");
            div.className = "card";

            div.innerHTML = `
                <img src="${g.banner_image}">
                <div style="padding:10px">${g.title}</div>
            `;

            div.onclick = () => openGame(g.namespace, g.title);

            grid.appendChild(div);
        });

        next = data.next_url;

    } catch (e) {
        console.error("Load error", e);
    }
}

function openGame(ns, title) {
    document.getElementById("gameView").style.display = "block";
    document.getElementById("frame").src =
        `https://play.gamepix.com/${ns}/embed?sid=${SID}`;
}

function closeGame() {
    document.getElementById("gameView").style.display = "none";
    document.getElementById("frame").src = "";
}

/* PAGES */
function showPage(p) {
    document.querySelectorAll(".page").forEach(x => x.classList.remove("active"));
    document.getElementById(p).classList.add("active");
}

function filterGames() {
    const q = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".card").forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
}

/* SETTINGS */
function openSettings() {
    document.getElementById("settings").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closeSettings() {
    document.getElementById("settings").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

/* THEMES */
function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
}

/* MUSIC */
const music = document.getElementById("music");

function toggleMusic() {
    if (music.paused) music.play();
    else music.pause();
}

/* WEATHER (FIXED) */
function setWeather(type) {
    const w = document.getElementById("weather");
    w.innerHTML = "";

    if (type === "none") return;

    for (let i = 0; i < 80; i++) {
        const el = document.createElement("div");
        el.style.position = "absolute";
        el.style.left = Math.random() * 100 + "%";
        el.style.top = "-10px";
        el.style.width = "2px";
        el.style.height = "10px";
        el.style.background = "white";
        el.style.opacity = "0.3";
        w.appendChild(el);

        el.animate([
            { transform: "translateY(0)" },
            { transform: "translateY(110vh)" }
        ], {
            duration: 2000 + Math.random() * 3000,
            iterations: Infinity
        });
    }
}

/* INIT */
window.onload = () => {
    loadGames();
};
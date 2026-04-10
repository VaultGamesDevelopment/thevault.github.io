const SID = "1";
let arcadeNextUrl = `https://feeds.gamepix.com/v2/json?order=quality&pagination=48&sid=${SID}`;

const save = (k, v) => localStorage.setItem(`vlt_v6_${k}`, v);
const load = (k) => localStorage.getItem(`vlt_v6_${k}`);

async function fetchArcade() {
    try {
        const res = await fetch(arcadeNextUrl);
        const data = await res.json();
        const grid = document.getElementById('arcade-grid');
        
        data.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.setAttribute('data-title', item.title.toLowerCase());
            card.onclick = () => {
                document.getElementById('zoneName').textContent = item.title;
                document.getElementById('iframe-container').innerHTML = 
                    `<iframe src="https://play.gamepix.com/${item.namespace}/embed?sid=${SID}" 
                     style="width:100%;height:100%;border:none;" allowfullscreen></iframe>`;
                document.getElementById('game-view').style.display = 'block';
            };
            card.innerHTML = `<img src="${item.banner_image}"><div class="game-info"><h3>${item.title}</h3></div>`;
            grid.appendChild(card);
        });
        arcadeNextUrl = data.next_url;
    } catch (e) { console.error("Arcade fetch failed", e); }
}

function setCloak(type) {
    const presets = {
        'google': { t: 'Google', i: 'https://www.google.com/favicon.ico' },
        'drive': { t: 'My Drive - Google Drive', i: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png' },
        'classroom': { t: 'Classes', i: 'https://ssl.gstatic.com/classroom/favicon.png' },
        'none': { t: 'The Vault', i: 'https://ssl.gstatic.com/docs/doclist/images/infinite_drive_2020q4.ico' }
    };
    
    document.title = presets[type].t;
    const fav = document.getElementById('tab-favicon');
    // Safety check for null
    if (fav) {
        fav.href = presets[type].i;
    }
    save('cloak', type);
}

function universalFilter() {
    const q = document.getElementById('game-search').value.toLowerCase();
    document.querySelectorAll('.game-card').forEach(c => {
        c.style.display = c.getAttribute('data-title').includes(q) ? 'block' : 'none';
    });
}

function closeGame() {
    document.getElementById('game-view').style.display = 'none';
    document.getElementById('iframe-container').innerHTML = '';
}

function toggleSettings(s) {
    document.getElementById('settings-modal').style.display = s ? 'block' : 'none';
    document.getElementById('modal-overlay').style.display = s ? 'block' : 'none';
}

function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    save('theme', t);
}

// Observer for infinite scroll
const observer = new IntersectionObserver(e => { if(e[0].isIntersecting) fetchArcade(); });
const sentinel = document.getElementById('sentinel');
if (sentinel) observer.observe(sentinel);

window.onload = () => {
    setTheme(load('theme') || 'dark');
    setCloak(load('cloak') || 'none');
    fetchArcade();
};
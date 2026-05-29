// 1. Define your data as a constant
const gamesData = [
    { "title": "Suggest A Game", "special": true, "image": "https://cdn-icons-png.flaticon.com/512/1828/1828817.png" },
    { "title": "Minecraft", "path": "./gmes/minecraft/index.html", "image": "./gmes/minecraft/thumb.png", "category": "Sandbox" },
    { "title": "Slope", "path": "./gmes/slope/index.html", "image": "./gmes/slope/thumb.png", "category": "Arcade" }
];

// 2. Use DOMContentLoaded to ensure elements exist before binding events
document.addEventListener('DOMContentLoaded', () => {
    
    // Feature: Search logic
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const filtered = gamesData.filter(g => 
                g.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            renderGames(filtered);
        });
    }

    // Initial load
    renderGames(gamesData);
});

// 3. Define render function globally
function renderGames(games) {
    const grid = document.getElementById('gameGrid');
    if (!grid) return; // Safety check

    grid.innerHTML = games.map(game => {
        if (game.special) {
            return `
                <div class="game-card special" onclick="window.open('https://forms.gle/qfWMzpUyt78AQo6r8', '_blank')">
                    <img src="${game.image}" alt="Suggest">
                    <h3>${game.title}</h3>
                </div>
            `;
        }
        return `
            <div class="game-card" onclick="loadGame('${game.path}')">
                <img src="${game.image}" alt="${game.title}">
                <h3>${game.title}</h3>
                <span class="category-tag">${game.category}</span>
            </div>
        `;
    }).join('');
}

function loadGame(path) {
    const content = document.getElementById('content');
    content.innerHTML = `<div class="iframe-container"><iframe src="${path}"></iframe></div>`;
}
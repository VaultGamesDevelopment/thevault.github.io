// Your JSON Data
const gamesData = [
  {
    "title": "Suggest A Game",
    "special": true,
    "image": "https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
  },
  {
    "title": "Minecraft",
    "path": "./gmes/minecraft/index.html",
    "image": "./gmes/minecraft/thumb.png",
    "category": "Sandbox"
  },
  {
    "title": "Slope",
    "path": "./gmes/slope/index.html",
    "image": "./gmes/slope/thumb.png",
    "category": "Arcade"
  },
  {
    "title": "Geometry Dash",
    "path": "./gmes/geometrydash/index.html",
    "image": "./gmes/geometrydash/thumb.png",
    "category": "Arcade"
  },
  {
    "title": "1v1 lol",
    "path": "./gmes/1v1lol/index.html",
    "image": "./gmes/1v1lol/thumb.png",
    "category": "Shooter"
  }
];

const renderGames = (games) => {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = games.map(game => {
        // Logic for Suggest A Game card
        if (game.special) {
            return `
                <div class="game-card special" onclick="window.open('https://forms.gle/qfWMzpUyt78AQo6r8', '_blank')">
                    <img src="${game.image}" alt="Suggest" style="width: 50px;">
                    <h3>${game.title}</h3>
                </div>
            `;
        }
        // Logic for standard game cards
        return `
            <div class="game-card" onclick="loadGame('${game.path}')">
                <img src="${game.image}" alt="${game.title}" style="width: 100%; border-radius: 4px;">
                <h3>${game.title}</h3>
                <span class="category-tag">${game.category}</span>
            </div>
        `;
    }).join('');
};

function loadGame(path) {
    const content = document.getElementById('content');
    // Basic iframe loader
    content.innerHTML = `<iframe src="${path}" style="width: 100%; height: 90vh; border: none;"></iframe>`;
}

// Initial render
renderGames(gamesData);
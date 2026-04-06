const Components = {
  gameCard(game) {
    const BASE = window.BASE;

    return `
      <div class="card" onclick='openGame(${JSON.stringify(game)})'>
        <img src="${BASE + game.image}">
        <div class="card-footer">
          <span>${game.title}</span>
          <button onclick="event.stopPropagation(); State.toggleFavorite(${JSON.stringify(game)})">
            ${State.isFavorite(game) ? "★" : "☆"}
          </button>
        </div>
      </div>
    `;
  }
};
const State = {
  favorites: JSON.parse(localStorage.getItem("favorites")||"[]"),
  search:"",

  toggleFavorite(game){
    const exists=this.favorites.find(g=>g.title===game.title);

    if(exists){
      this.favorites=this.favorites.filter(g=>g.title!==game.title);
    }else{
      this.favorites.push(game);
    }

    localStorage.setItem("favorites",JSON.stringify(this.favorites));
    UI.renderFavorites();
    renderGames();
  },

  isFavorite(game){
    return this.favorites.some(g=>g.title===game.title);
  }
};
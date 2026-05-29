const gamesDiv = document.getElementById("games");
const search = document.getElementById("search");

let allGames = [];

window.addEventListener("load", async () => {

  const snapshot = await db.collection("games").get();

  snapshot.forEach(doc => {
    const g = doc.data();
    allGames.push(g);
  });

  renderGames(allGames);

  document.getElementById("loader").style.display = "none";
  document.getElementById("app").style.display = "block";
});

function renderGames(list) {
  gamesDiv.innerHTML = "";

  list.forEach(g => {
    const div = document.createElement("div");
    div.className = "game";

    div.innerHTML = `
      <img src="${g.image}">
      <h3 style="padding:10px">${g.title}</h3>
    `;

    div.onclick = () => {
      window.location.href = g.path;
    };

    gamesDiv.appendChild(div);
  });
}

search.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = allGames.filter(g =>
    g.title.toLowerCase().includes(value)
  );
  renderGames(filtered);
});
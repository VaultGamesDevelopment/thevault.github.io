window.addEventListener("DOMContentLoaded", () => {
  const namespace = localStorage.getItem("gameNamespace");
  const sid = "1";

  if (!namespace) {
    document.body.innerHTML = "No game selected.";
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = `https://play.gamepix.com/${namespace}/embed?sid=${sid}`;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.frameBorder = "0";

  document.getElementById("gameContainer").appendChild(iframe);
});
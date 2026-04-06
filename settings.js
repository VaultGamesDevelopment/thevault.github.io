function openSettings(){
  document.getElementById("settingsModal").style.display="flex";
}

function applySettings(){
  const theme=document.getElementById("themeSelect").value;
  const weather=document.getElementById("weatherSelect").value;
  const cloak=document.getElementById("cloakSelect").value;

  UI.setTheme(theme);
  UI.setWeather(weather);

  localStorage.setItem("cloak",cloak);

  document.getElementById("settingsModal").style.display="none";

  if(cloak!=="none") location.reload();
}
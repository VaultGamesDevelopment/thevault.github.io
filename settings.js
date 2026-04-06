function openSettings(){
  document.getElementById("settingsModal").style.display="flex";
}

function applySettings(){
  const theme=document.getElementById("themeSelect").value;
  const weather=document.getElementById("weatherSelect").value;
  const cloak=document.getElementById("cloakSelect").value;

  const density=document.getElementById("densitySelect").value;
  const blur=document.getElementById("blurSelect").value;
  const animation=document.getElementById("animationSelect").value;

  UI.setTheme(theme);
  UI.setWeather(weather);

  localStorage.setItem("cloak",cloak);
  localStorage.setItem("density",density);
  localStorage.setItem("blur",blur);
  localStorage.setItem("animation",animation);

  UI.applyExtras();

  document.getElementById("settingsModal").style.display="none";

  if(cloak!=="none") location.reload();
}
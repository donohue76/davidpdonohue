// Fade-wave rotating languages
const languages = [
  "Welcome to My World",
  "Fáilte go Mo Shaol",
  "Bienvenido a Mi Mundo",
  "Bienvenue dans Mon Monde",
  "Benvenuto nel Mio Mondo",
  "Willkommen in Meiner Welt",
  "Bem-vindo ao Meu Mundo",
  "私の世界へようこそ",
  "欢迎来到我的世界",
  "내 세상에 오신 것을 환영합니다"
];

let currentLangIndex = 0;

function updateHeroText(newText) {
  const heroText = document.getElementById("heroText");
  if(heroText){
    heroText.textContent = newText;
    heroText.className = "fadeWave";
  }
}

function changeLanguage() {
  currentLangIndex = (currentLangIndex + 1) % languages.length;
  updateHeroText(languages[currentLangIndex]);
}

document.addEventListener("DOMContentLoaded", () => {
  updateHeroText(languages[currentLangIndex]);
  setInterval(changeLanguage, 4000);
});

// Modal Functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Prevent scroll restoration on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.onload = function() { window.scrollTo(0, 0); };

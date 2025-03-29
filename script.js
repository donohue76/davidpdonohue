// --- Language and Animation Setup ---
const languages = [
  "Welcome to My World",        // English
  "Fáilte go Mo Shaol",         // Irish
  "Bienvenido a Mi Mundo",       // Spanish
  "Bienvenue dans Mon Monde",    // French
  "Benvenuto nel Mio Mondo",     // Italian
  "Willkommen in Meiner Welt",   // German
  "Bem-vindo ao Meu Mundo",      // Portuguese
  "私の世界へようこそ",              // Japanese
  "欢迎来到我的世界",              // Chinese
  "내 세상에 오신 것을 환영합니다"    // Korean
];
// Define 9 distinct animations (mixing per-letter and per-word effects)
const animations = [
  "typewriter",             // whole text typewriter effect
  "bounceInLetter",         // per-letter bounce in
  "bounceInWord",           // per-word bounce in
  "slideInRightLetter",     // per-letter slide in right
  "slideInRightWord",       // per-word slide in right
  "rollInRightLetter",      // per-letter roll in right
  "rollInRightWord",        // per-word roll in right
  "slideInLeftLetter",      // per-letter slide in left
  "slideInLeftWord"         // per-word slide in left
];
let animationPool = [...animations];
let lastAnimClass = "";
let currentLangIndex = 0;

// --- Function to update hero text ---
function updateHeroText(newText, animClass) {
  const heroText = document.getElementById("heroText");
  heroText.innerHTML = ""; // Clear previous content

  if (animClass === "typewriter") {
    heroText.textContent = newText;
    heroText.classList.add("typewriter");
  }
  else if (animClass.includes("Letter")) {
    heroText.classList.remove("typewriter");
    // Split text into individual characters
    for (let i = 0; i < newText.length; i++) {
      const span = document.createElement("span");
      span.textContent = newText[i];
      span.style.animationDelay = (i * 0.1) + "s";
      span.classList.add(animClass);
      heroText.appendChild(span);
    }
  }
  else if (animClass.includes("Word")) {
    heroText.classList.remove("typewriter");
    // Split text into words (preserving spaces)
    const words = newText.split(" ");
    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.animationDelay = (index * 0.2) + "s";
      span.classList.add(animClass);
      heroText.appendChild(span);
    });
  }
}

// --- Function to change language ---
function changeLanguage() {
  currentLangIndex = (currentLangIndex + 1) % languages.length;
  const heroText = document.getElementById("heroText");
  heroText.classList.remove(...animations);
  
  // Reset pool if empty
  if (animationPool.length === 0) {
    animationPool = [...animations];
  }
  // Randomly select an animation from pool avoiding repetition if possible
  let randomIndex = Math.floor(Math.random() * animationPool.length);
  let animClass = animationPool[randomIndex];
  if (animationPool.length > 1) {
    while (animClass === lastAnimClass) {
      randomIndex = Math.floor(Math.random() * animationPool.length);
      animClass = animationPool[randomIndex];
    }
  }
  animationPool.splice(randomIndex, 1);
  lastAnimClass = animClass;
  
  updateHeroText(languages[currentLangIndex], animClass);
}

// --- Start Language Rotation ---
setInterval(changeLanguage, 3000);

// --- Modal Functions ---
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

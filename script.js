/* davidpdonohue/scripts.js*/

/* Run rotating languages animation only if not on splash page */
if (!document.body.classList.contains("splash-page")) {
  const languages = [
    "Welcome",
    "Fáilte",
    "Bienvenido",
    "Bienvenue",
    "Benvenuto",
    "Willkommen",
    "私の世界へようこそ",
    "欢迎来到我的世界",
  ];

  const animations = [
    "typewriter", "bounceInLetter", "bounceInWord", "slideInRightLetter",
    "slideInRightWord", "rollInRightLetter", "rollInRightWord", "slideInLeftLetter",
    "slideInLeftWord"
  ];
  let animationPool = [...animations];
  let lastAnimClass = "";
  let currentLangIndex = 0;

  function updateHeroText(newText, animClass) {
    const heroText = document.getElementById("heroText");
    heroText.innerHTML = ""; // Clear previous content

    if (animClass === "typewriter") {
      heroText.textContent = newText;
      heroText.classList.add("typewriter");
    } else if (animClass.includes("Letter")) {
      heroText.classList.remove("typewriter");
      for (let i = 0; i < newText.length; i++) {
        const span = document.createElement("span");
        span.textContent = newText[i];
        span.style.animationDelay = (i * 0.1) + "s";
        span.classList.add(animClass);
        heroText.appendChild(span);
      }
    } else if (animClass.includes("Word")) {
      heroText.classList.remove("typewriter");
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

  function changeLanguage() {
    currentLangIndex = (currentLangIndex + 1) % languages.length;
    const heroText = document.getElementById("heroText");
    heroText.classList.remove(...animations);

    // Reset pool if empty
    if (animationPool.length === 0) {
      animationPool = [...animations];
    }
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

  document.addEventListener("DOMContentLoaded", () => {
    updateHeroText(languages[currentLangIndex], animations[0]);
    setInterval(changeLanguage, 3000);
  });
}

/* Modal Functions (run on all pages) */
function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.onload = function() { window.scrollTo(0, 0); };

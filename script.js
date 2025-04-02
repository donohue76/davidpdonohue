/* davidpdonohue/scripts.js*/

// Run rotating languages animation only if not on splash page
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
    "typewriter",
    "bounceInLetter",
    "bounceInWord",
    "slideInRightLetter",
    "slideInRightWord",
    "rollInRightLetter",
    "rollInRightWord",
    "slideInLeftLetter",
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

/* Modal Functions */
function openModal(contentId) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const contentArea = modal.querySelector('.content-area');

    // Modal content mapping
    const content = {
        myStory: {
            title: "My Story",
            body: `[Your My Story content here]`
        },
        resume: {
            title: "Resume",
            body: `[Your Resume content here]`
        },
        favorites: {
            title: "Favorites",
            body: `[Your Favorites content here]`
        }
    };

    // Update modal content
    modalTitle.textContent = content[contentId].title;
    modalBody.textContent = content[contentId].body;

    // Show modal with animation
    modal.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // Check if content needs scroll indicator
    checkScrollIndicator(contentArea);

    // Add scroll event listener to content area
    contentArea.addEventListener('scroll', () => checkScrollIndicator(contentArea));
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("open");
    document.body.style.overflow = ""; // Re-enable background scrolling
}

function checkScrollIndicator(contentArea) {
    const hasOverflow = contentArea.scrollHeight > contentArea.clientHeight;
    const isScrolledToBottom = contentArea.scrollHeight - contentArea.scrollTop === contentArea.clientHeight;
    
    contentArea.parentElement.classList.toggle('has-overflow', hasOverflow && !isScrolledToBottom);
}

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

// Close modal when clicking outside
document.addEventListener("click", (e) => {
    const modal = document.getElementById("modal");
    if (e.target === modal) {
        closeModal();
    }
});

// Preserve your existing scroll restoration code
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Smooth scroll and section visibility handling
document.addEventListener('DOMContentLoaded', () => {
    // Existing DOMContentLoaded code remains...

    // Intersection Observer for sections
    const sections = document.querySelectorAll('#mainContainer section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to currently visible section
                entry.target.classList.add('section-visible');
                
                // Update nav links
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('nav a').forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            } else {
                entry.target.classList.remove('section-visible');
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of section is visible
    });

    sections.forEach(section => observer.observe(section));

    // Smooth scroll handling
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

window.onload = function() { window.scrollTo(0, 0); };
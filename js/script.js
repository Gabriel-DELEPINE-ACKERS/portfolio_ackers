// easter-egg.js

let clickCounter = 0;
const maxClicks = 5;
const DURATION = 5000; // durée de la pluie de confettis (ms)
const MESSAGE_DURATION = 2500; // durée du message (ms)

// élément déclencheur (logo ou body pour test)
const trigger = document.querySelector(".navbar-brand");

// Crée un confetti
function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * window.innerWidth + "px";

    const size = Math.random() * 8 + 4;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";

    confetti.style.backgroundColor =
        `hsl(${Math.random() * 360}, 100%, 50%)`;

    const duration = Math.random() * 1.5 + 1;
    confetti.style.animationDuration = duration + "s";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), duration * 1000);
}

// Affiche le message
function showMessage(text) {
    const msg = document.createElement("div");
    msg.classList.add("easter-egg-message");
    msg.textContent = text;
    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), MESSAGE_DURATION);
}

// Lancement des confettis
function launchConfettiRain() {
    showMessage("🎉 Easter Egg trouvé ! 🎉");

    const interval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            createConfetti();
        }
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        clickCounter = 0; // reset compteur
    }, DURATION);
}

// Écoute des clics
if (trigger) {
    trigger.addEventListener("click", (event) => {
        const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/" || window.location.pathname === "";

        clickCounter++;

        if (clickCounter === maxClicks) {
            event.preventDefault();
            launchConfettiRain();
        } else if (isHomePage) {
            event.preventDefault();
        }
    });
}

console.log("color-modes.js chargé");

(() => {
    const setTheme = theme => {
        document.documentElement.setAttribute('data-bs-theme', theme)
        localStorage.setItem('theme', theme)
    }

    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) setTheme(storedTheme)

    document.querySelectorAll('[data-bs-theme-value]')
        .forEach(btn => {
            btn.addEventListener('click', () => {
                setTheme(btn.getAttribute('data-bs-theme-value'))
            })
        })
})()

document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    const year = new Date().getFullYear();
    yearSpan.textContent = year;
});

document.addEventListener("DOMContentLoaded", function () {
    const loader = document.querySelector("#loader");

    // On vérifie si l'utilisateur est déjà venu pendant cette session
    if (sessionStorage.getItem("hasVisited")) {
        // S'il est déjà venu, on cache le loader immédiatement
        loader.classList.add("no-animation");
    } else {
        // Si c'est sa première fois, on attend que tout soit chargé
        window.addEventListener("load", function () {
            setTimeout(() => {
                loader.classList.add("loader-hidden");
                // On enregistre qu'il est venu
                sessionStorage.setItem("hasVisited", "true");
            }, 2000); // Temps de l'animation cyber
        });
    }
});
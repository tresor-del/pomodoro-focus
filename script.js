let timerDisplay;
let startBtn;
let resetBtn;
let progressBar;

let tempsRestant = 25 * 60;
let chronometre = null;
let estEnModeTravail = true;

document.addEventListener("DOMContentLoaded", function () {
  timerDisplay = document.getElementById("timer");
  startBtn = document.getElementById("start-btn");
  resetBtn = document.getElementById("reset-btn");
  progressBar = document.getElementById("progress-bar");


  // lier les événements
  if (startBtn) startBtn.addEventListener("click", demarrerChrono);
  if (resetBtn) resetBtn.addEventListener("click", resetChrono);

  // afficher le temps initial
  afficherTemps();
});

// fonction pour afficher le temps proprement
function afficherTemps() {
  let minute = Math.floor(tempsRestant / 60);
  let secondes = tempsRestant % 60;

  // utiliser '0' comme caractère de remplissage
  if (timerDisplay) {
    timerDisplay.innerHTML = `${minute.toString().padStart(2, "0")}:${secondes
      .toString()
      .padStart(2, "0")}`;
  }
}

// fonction pour lancer le compte à rebours
function demarrerChrono() {

    if (chronometre !== null) {
        clearInterval(chronometre);
        chronometre = null;
        startBtn.innerText = "REPRENDRE";
        startBtn.style.backgroundColor = "#fbbf24";
        return;
    };
  startBtn.innerText = "PAUSE";
  startBtn.style.backgroundColor = "#ef4444"; 

  chronometre = setInterval(() => {
    tempsRestant--;
    afficherTemps();
    mettreAJourBarre();

    if (tempsRestant <= 0) {
      clearInterval(chronometre);
      chronometre = null;

      let son = new Audio('media/audio.mp3');
      son.play();

      estEnModeTravail = !estEnModeTravail;

      if (estEnModeTravail) {
        tempsRestant = 25 * 60;
        alert("Bon travail !");
      } else {
        tempsRestant = 5 * 60;
        alert("C'est l'heure de la pause")
      }

      startBtn.innerText = "DÉMARRER";
      startBtn.style.backgroundColor = "#10b981";

      afficherTemps();
      mettreAJourBarre();
    }
  }, 1000);
}

// fonction pour remettre à zéro le chrono
function resetChrono() {
    if (chronometre !== null) {
        clearInterval(chronometre);
        chronometre = null;
    }
    estEnModeTravail = true;
    tempsRestant = 25 * 60;

    startBtn.innerText = "DÉMARRER";
    startBtn.style.backgroundColor = "#10b981";

    afficherTemps();
    mettreAJourBarre();
}

function mettreAJourBarre() {
    if (!progressBar) return;

    const tempsTotal = estEnModeTravail ? 25 * 60: 5 * 60;

    const pourcentage = (tempsRestant / tempsTotal) * 100;

    progressBar.style.width = `${pourcentage}%`;

    progressBar.style.backgroundColor = estEnModeTravail ? "#10b981" : "#3b82f6";
}
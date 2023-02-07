document.addEventListener("DOMContentLoaded", () => {
  //jQuery

  $(function () {
    //hide horloge
    $(".horloge-container").hide();
    $("#hor").click(function () {
      $(".horloge-container").toggle();
    });
    //hide chrono
    $(".chronometre-container").hide();
    $("#chro").click(function () {
      $(".chronometre-container").toggle();
    });
  });

  //Logique pour affichage Horloge
  // instance d'un objet date avec la classe date()
  let horloge = new Date();
  //Utilisation de setInterval pour apelle la function toute les millisecondes

  setInterval(myClock, 1000);

  // Function de l'horloge
  function myClock() {
    const clock = new Date();
    const clockDipsplay = document.getElementById("dateComplete");
    clockDipsplay.innerHTML = clock.toLocaleTimeString() + "s";
  }

  // Logique du Chronometre

  let displayChrono = document.querySelector(".chro");
  // console.log(displayChrono);
  // console.log(displayChrono.textContent);

  let startBtn = document.querySelector("#start");

  let stopBtn = document.querySelector("#stop");

  let resetBtn = document.querySelector("#reset");

  let tourBtn = document.querySelector("#tour");

  let displayTour = document.querySelector(".tourchrono");
  let chronoList = document.querySelector(".chronolist");
  let displayFinishMin = document.querySelector(".container-finish-min");

  let heures = 0;
  let minutes = 0;
  let secondes = 0;

  let timeout;
  let chronoArette = true;

  // function pour start le chrono
  const startChrono = () => {
    if (chronoArette) {
      chronoArette = false;
      //si le chrono n'est pas aretter on lance la function
      defilerTemps();
    }
  };

  // function pour aretter le chrono
  const stopChrono = () => {
    if (!chronoArette) {
      chronoArette = true;
      clearTimeout(timeout);
    }
  };

  const defilerTemps = () => {
    // verif pour voir si le temps est arette
    if (chronoArette) {
      return;
    }
    // si c'est aretter on return donc le code ne s'excute pas
    secondes = parseInt(secondes);
    minutes = parseInt(minutes);
    heures = parseInt(heures);

    secondes++;

    if (secondes == 60) {
      minutes++;
      secondes = 0;
    }

    if (minutes == 60) {
      heures++;
      minutes = 0;
    }
    // affichage du temps;

    if (secondes < 10) {
      secondes = "0" + secondes; //
    }
    if (minutes < 10) {
      minutes = "0" + minutes; //
    }
    if (heures < 10) {
      heures = "0" + heures; //
    }

    // on cree une chaine de caractere dynamique
    displayChrono.textContent = `${heures}:${minutes}:${secondes}`;

    timeout = setTimeout(defilerTemps, 1000);
    //console.log(timeout);
  };

  // pour afficher nb de tour
  const nbTour = () => {
    // on crée à chaque tour un element html pour stocker les times des tours
    const showTour = document.createElement("li");
    console.log((showTour.textContent = "tour :" + displayChrono.textContent));
    chronoList.append(showTour);
    console.log(chronoList);
  };

  const reset = () => {
    // on reset toutes les variables
    displayChrono.textContent = "00:00:00";
    chronoArette = true;
    heures = 0;
    minutes = 0;
    secondes = 0;
    //on supprime les temps de tours
    chronoList.innerHTML = "";

    clearTimeout(timeout);
  };

  //evenement

  startBtn.addEventListener("click", startChrono);
  stopBtn.addEventListener("click", stopChrono);
  tourBtn.addEventListener("click", nbTour);
  resetBtn.addEventListener("click", reset);

  //Logique Minuteur

  //on recupere tout nos elements
  let hoursEl = document.querySelector("#hours");
  let minutesEl = document.querySelector("#minutes");
  let secondsEl = document.querySelector("#secondesMinuteur");
  let btnStart = document.querySelector(".btn-start-resume");
  let btnPause = document.querySelector(".btn-pause");
  let btnStop = document.querySelector(".btn-stope");
  let btnReset = document.querySelector(".btn-reset");
  //on recupere la valeur de départ de de l'input pour l'implementer à la fin du chrono
  let valeurInitTimer=parseInt(document.querySelector("#minutes").value);
  console.log(typeof valeurInitTimer);
  // on set les variables pour pouvoir changer leurs valeurs en fonction du comportement du minuteur
  let interval;
  let pause = false;
  let totalSeconds = 0;
  let totalSecondsBackUp = 0;

  init();

  function init() {
    // function pour initaliser tous les bouttons du timers

    btnPause.style.display = "none";
    btnStop.style.display = "none";
    btnReset.style.display = "none";

    btnStart.addEventListener("click", () => {
      const hoursMin = parseInt(hoursEl.value);

      const minutesMin = parseInt(minutesEl.value);

      const secondesMin = parseInt(secondsEl.value);
      console.log(hoursMin, minutesMin, secondesMin);

      totalSecondsBackUp = totalSeconds =
        hoursMin * 60 * 60 + minutesMin * 60 + secondesMin;
      if (totalSeconds < 0) {
        //quand la valeur des inputs est negative, rien ne se passe
        return;
      }
      console.log(totalSeconds);

      startMin();
      btnPause.style.display = "inline-block";
      btnStop.style.display = "inline-block";
      btnReset.style.display = "inline-block";
      btnStart.style.display = "none";
      displayFinishMin.style.display="none";
      valeurInitTimer=5;
    });

    btnPause.addEventListener("click", () => {
      //evenement sur le btnPause
      pause = !pause;
      if (pause) {
        btnPause.innerText = "Reprendre";
      } else {
        btnPause.innerText = "Pause";
      }
    });

    btnStop.addEventListener("click", () => {
      stopMin();
      totalSeconds = totalSecondsBackUp;
      updateInputs();
      pause = false;
      btnPause.style.display = "none";
      btnStop.style.display = "none";
      btnReset.style.display = "none";
      btnStart.style.display = "";
    });

    btnReset.addEventListener("click", () => {
      totalSeconds = totalSecondsBackUp;
      updateInputs();
      displayFinishMin.style.display = "none";
    });
  }

  function startMin() {
    //function pour start le minteur
    interval = setInterval(() => {
      if (pause) return;
      totalSeconds--;
      updateInputs();

      if (totalSeconds <= 0) {
        // stopMin();
        //Création d'une alert qui indique la fin du minuteur
        displayFinishMin.style.display = "inline-block";
        btnPause.style.display = "none";
        btnStop.style.display = "none";
        btnReset.style.display = "none";
        btnStart.style.display = "inline-block";
        
        //alert('test');
        stopMin();
      }
    }, 1000);
  }

  function stopMin() {
    //function stop miniteur
    interval = clearInterval(interval);
  }

  function updateInputs() {
    //function pour les h/m/s defilent
    const hoursMin = Math.floor(totalSeconds / 60 / 60);
    const minutesMin = Math.floor(totalSeconds / 60) % 60;
    const secondesMin = totalSeconds % 60;

    hoursEl.value = hoursMin;
    minutesEl.value = minutesMin;
    secondsEl.value = secondesMin;
  }
});

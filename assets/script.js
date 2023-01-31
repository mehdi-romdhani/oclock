document.addEventListener("DOMContentLoaded", () => {
  //jQuery

    $(function () {
      //hide horloge
      $(".horloge-container").hide();
      $("#hor").click(function () {
        $(".horloge-container").toggle();
      });
      //hide chrono
      $('.chronometre-container').hide();
      $("#chro").click(function(){
        $('.chronometre-container').toggle();
      })

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
    clockDipsplay.innerHTML = clock.toLocaleTimeString()+"s";
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
  let chronoList=document.querySelector(".chronolist");

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
      chronoList.innerHTML="";
    
    clearTimeout(timeout);
  };

  //evenement

  startBtn.addEventListener("click", startChrono);
  stopBtn.addEventListener("click", stopChrono);
  tourBtn.addEventListener("click", nbTour);
  resetBtn.addEventListener("click", reset);

  //Logique Minuteur
  
});

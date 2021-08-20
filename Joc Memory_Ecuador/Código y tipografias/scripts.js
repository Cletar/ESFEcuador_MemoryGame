const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;
  var aux_card = firstCard.dataset.framework;
  if (checkForMatch()){
    //Nivel_Fácil
    if (aux_card == 'Planta1') {
      document.getElementById('mensaje-planta1').style.display = "block";
      setTimeout(function(){document.getElementById('mensaje-planta1').style.display = "none";}, 1000);
    }
    if (aux_card == 'Planta2') {
      document.getElementById('mensaje-planta2').style.display = "block";
      setTimeout(function(){document.getElementById('mensaje-planta2').style.display = "none";}, 1000);
    }
    if (aux_card == 'Planta3') {
      document.getElementById('mensaje-planta3').style.display = "block";
      setTimeout(function(){document.getElementById('mensaje-planta3').style.display = "none";}, 1000);
    }
    if (aux_card == 'Planta4') {
      document.getElementById('mensaje-planta4').style.display = "block";
      setTimeout(function(){document.getElementById('mensaje-planta4').style.display = "none";}, 1000);
    }
    //Nivel_Medio
    if (aux_card == 'jaguar') {
      document.getElementById('mensaje-jaguar').style.display = "block";
      setTimeout(function(){document.getElementById('mensaje-jaguar').style.display = "none";}, 1000);
    }
    if (aux_card == 'cocodrilo') {
      document.getElementById('mensaje-cocodrilo').style.display = "block";
      setTimeout(function(){document.getElementById('mensaje-cocodrilo').style.display = "none";}, 1000);
    }
    if (aux_card == 'colibrí') {
      document.getElementById('mensaje-colibrí').style.display = "block";
      setTimeout(function(){document.getElementById('mensaje-colibrí').style.display = "none";}, 1000);
    }
    if (aux_card == 'rinoceronte') {
      document.getElementById('mensaje-rinoceronte').style.display = "block";
      setTimeout(function(){document.getElementById('mensaje-rinoceronte').style.display = "none";}, 1000);
    }
    if (aux_card == 'serpiente') {
      document.getElementById('mensaje-serpiente').style.display = "block";
      setTimeout(function(){document.getElementById('mensaje-serpiente').style.display = "none";}, 1000);
    }
    if (aux_card == 'girafa') {
      document.getElementById('mensaje-girafa').style.display = "block";
      setTimeout(function(){document.getElementById('mensaje-girafa').style.display = "none";}, 1000);
    }        
  }
}



function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
  return isMatch;

}



function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));



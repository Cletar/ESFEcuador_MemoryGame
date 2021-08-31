const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var n_count=0
var lista= []

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
    var carta = 'mensaje-' + String(aux_card);
    document.getElementById(carta).style.display = "block";
    setTimeout(function(){document.getElementById(carta).style.display = "none";}, 1000);
    lista=lista.concat(aux_card);
    if (lista.includes("planta1")&& lista.length == 4 ||lista.includes("jaguar")&& lista.length == 6 || lista.includes("cocina")&& lista.length == 9){
      setTimeout(function(){document.getElementById("Atrás").style.display = "block";},1000);
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



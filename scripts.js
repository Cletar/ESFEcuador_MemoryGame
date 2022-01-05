const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var n_count=0
var lista= []



var temps = 0;

var comptador = setInterval(function() {
  temps++;

  var min = Math.floor(temps/60);
  var seg = temps%60;

  seg = ('0'+seg).slice(-2);
  min = ('0'+min).slice(-2);

  document.querySelector(".segundos").innerHTML = seg;
  document.querySelector(".minutos").innerHTML = min;
},1000);


var missatge_tancament;

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
    var cerrar = 'cerrar-' + carta
    document.getElementById(carta).style.display = "block"; 
    lockBoard = true;
    missatge_tancament = setTimeout(function(){
      document.getElementById(carta).style.display = "none";
      lockBoard =false;
      final_juego();
    }, 25000);
    document.getElementById(cerrar).onclick = () => {
      document.getElementById(carta).style.display = "none";
      lockBoard = false;
      clearTimeout(missatge_tancament)
      final_juego();
    }
    lista=lista.concat(aux_card);
  }
}

function final_juego(){
  if (lista.includes("Floripondio")&& lista.length == 4 ||lista.includes("jaguar")&& lista.length == 6 || lista.includes("1")&& lista.length == 9){
    document.getElementById("Atrás").style.display = "flex";
    clearInterval(comptador)
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


const dom = {
    time: $( '.time')[0],
    finalTime: $('.final-time')[0],
}

const render = {
    initDigits: (texts) => {
        allTexts = texts.concat(_.fill(Array(ALL_DIGITS.length - texts.length), ''))
        _.shuffle(dom.digits).forEach((digit, i) => {
            digit.innerText = allTexts[i]
            digit.className = ''
        })
    },
    updateTime: (value) => {
        dom.time.innerText = value
    },

    updateFinal: () => {
        dom.finalTime.innerText = dom.time.innerText
    },
}
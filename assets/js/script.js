let cards = [];
let qtdCard;
let firstCard, secondCard;
let rounds = 0;
let rightMoves = 0;
let startTime = 0;
let elapsedTimeInSeconds = 0;
let timerEnd = false;

const gifsImg = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];

function restartGame() {
  
  

  let playAgain = prompt("Gostaria de reiniciar a partida? (sim/não)")
  const denyAnswers = ["sim", "não"]
  
  while (!denyAnswers.includes(playAgain.toLowerCase())) {
    playAgain = prompt("Por favor, responda apenas com 'sim' ou 'não'. Gostaria de reiniciar a partida?")
  }
  
  if (playAgain.toLowerCase() === "sim") {
    cards = [];
    qtdCard = undefined;
    firstCard, secondCard = undefined;
    rounds = 0;
    rightMoves = 0;

    const board = document.querySelector(".board");
    board.innerHTML = "";

    play();
  } else {
    timerEnd = true;
    alert("Obrigado por jogar!")
  }
}

function startClock() {
  const clockElement = document.getElementById("clock");
  
  function updateClock() {
    if (timerEnd) {
      clearInterval(intervalId);
      return;
    }
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const timeString = `${hours}:${minutes}:${seconds}`;
    clockElement.textContent = timeString;

    elapsedTimeInSeconds = Math.round((now.getTime() - startTime.getTime()) / 1000);
    const elapsedTimeString = `${elapsedTimeInSeconds}`;
    document.getElementById("elapsedTime").textContent = elapsedTimeString;
  }
  updateClock();
  setInterval(updateClock, 1000);
}


function checkEnd() {
  if (rightMoves === qtdCard) {
    const endTime = new Date();
    const elapsedTimeInSeconds = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    setTimeout(function() {
      alert(`Você ganhou em ${rounds} jogadas! A duração do jogo foi de ${elapsedTimeInSeconds} segundos!`);
      restartGame();
    }, 500); // atrasa a exibição da mensagem em 500ms
  }
}

function resetCard() {
  firstCard = undefined;
  secondCard = undefined;
}

function shuffle() {
  return Math.random() - 0.5;
}

function flipCard() {
  firstCard.classList.remove("turn");
  secondCard.classList.remove("turn");

  resetCard();
}

function checkCard(card){
  if (firstCard === undefined) {
    firstCard = card;
  } else {
    if (secondCard === undefined) {
      secondCard = card;

      if (firstCard.querySelector(".back img").src === secondCard.querySelector(".back img").src) {
        rightMoves += 2;
        resetCard();
        checkEnd();
      } else {
        setTimeout(flipCard, 1000);
      }
    }
  }
}

function createCards() {
  for (let i = 0; i < qtdCard / 2; i++) {
    let gif = gifsImg[i];

    cards.push(gif);
    cards.push(gif);
  }

  cards.sort(shuffle);
}

function insertCards() {
  const board = document.querySelector(".board");
  startTime = new Date();

  for (let gif = 0; gif < cards.length; gif++) {
    let cardsList = `
      <li class="card-complete" onclick="backFlip(this)">
        <div class="card">
            <div class="front">
                <img src="./assets/images/back.png">
            </div>
            <div class="back">
                <img src="./assets/images/${cards[gif]}.gif">
            </div>
        </div>
      </li>
    `;
    board.innerHTML += cardsList;
  }
}


function inputUser() {
  qtdCard = parseInt(prompt("Com quantas cartas quer jogar"));

  while (qtdCard % 2 !== 0 || qtdCard > 14 || qtdCard < 4) {
    qtdCard = parseInt(prompt("Com quantas cartas quer jogar?"));
  }
  document.querySelector('.board').classList.add(`table-${qtdCard}`);
}

function backFlip(card) {
  if (card.classList.contains("turn")) {
    return;
  }

  if (firstCard !== undefined && secondCard !== undefined) {
    return;
  }

  card.classList.add("turn");

  rounds++;

  checkCard(card)

}

function play(){
  inputUser();
  createCards();
  insertCards();
  startClock();
}

play();


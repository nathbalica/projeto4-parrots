let cards = [];
let qtdCard;
let firstCard, secondCard;
let rounds = 0;
let rightMoves = 0;

const gifsImg = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];

function checkEnd() {
  if (rightMoves === qtdCard) {
    alert(`Você ganhou em ${rounds} jogadas!`);
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

function main(){
  inputUser();
  createCards();
  insertCards();

}

main()

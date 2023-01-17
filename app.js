//* Variables.

const yourChoice = document.getElementById("your-choice");
const pcChoice = document.getElementById("pc-choice");
const select = document.querySelector(".select");
let userSelect;
let pcRandom;

//*To show score

const scoreYou = document.getElementById("you");
const scorePc = document.getElementById("pc");
const domTopScore = document.querySelector(".top-score");

//* Modal Selectors

const resultDiv = document.querySelector(".result-msg");
const containerEl = document.querySelector(".container");
const modalEl = document.querySelector(".modal-container");
const modalBtn = document.querySelector("#modal-ok");

// To show user's choice on screen
select.addEventListener("click", (e) => {
  if (e.target.getAttribute("alt")) {
    userSelect = e.target.getAttribute("alt");
    yourChoice.innerHTML = `<img src="./assets/${userSelect}.png"></img>`;
  }

  pc();
});

// To show pc's choice to screen
const pcArr = ["tas", "kagit", "makas"];

function pc() {
  pcRandom = pcArr[Math.floor(Math.random() * 3)];
  pcChoice.innerHTML = `<img src="./assets/${pcRandom}.png"></img>`;

  result();
}

function result() {
  switch (userSelect) {
    case "tas":
      if (pcRandom == "kagit") {
        lost();
      } else if (pcRandom == "makas") {
        win();
      }
      break;
    case "kagit":
      if (pcRandom == "makas") {
        lost();
      } else if (pcRandom == "tas") {
        win();
      }
      break;
    case "makas":
      if (pcRandom == "tas") {
        lost();
      } else if (pcRandom == "kagit") {
        win();
      }
      break;

    default:
      break;
  }

  if (userSelect == pcRandom) {
    resultDiv.classList.add("active");
    resultDiv.innerHTML = "It's a Draw";
    containerEl.style.boxShadow = "3px 3px 10px 1px #FFC538";
    resultDiv.style.backgroundColor = "#FFC538";
  }

  if (scoreYou.innerText == "10") {
    final.innerHTML = `💃 You Win🕺`;
    document.querySelector(".modal").style.backgroundColor = "#5AB7AC";
    modalBtn.style.color = "#5AB7AC";
    topScoreCheck();
  }
  if (scoreYou.innerText == "10" || scorePc.innerText == "10") {
    modal();
  }
}

function lost() {
  resultDiv.classList.add("active");
  resultDiv.innerHTML = "You Lost";
  containerEl.style.boxShadow = "3px 3px 10px 1px red";
  resultDiv.style.backgroundColor = "red";
  scorePc.innerText++;
}

function win() {
  resultDiv.classList.add("active");
  resultDiv.innerHTML = "You Win";
  containerEl.style.boxShadow = "3px 3px 10px 1px #5AB7AC";
  resultDiv.style.backgroundColor = "#5AB7AC";
  scoreYou.innerText++;
}

// modal open
function modal() {
  modalEl.classList.add("show");
}
// modal close. Renew the page.
modalBtn.addEventListener("click", () => {
  modalEl.style.display = "none";
  window.location.reload();
});

// local storage.
let storagedScore = localStorage.getItem("highScore");
let topScore;

//To show 0-0 if local storage is empty
if (storagedScore) {
  topScore = `10 - ${storagedScore}`;
} else {
  topScore = "0 - 0";
}

// print high score
domTopScore.innerText = topScore;

function topScoreCheck() {
  storagedScore || localStorage.setItem("highScore", +scorePc.innerText);

  if (storagedScore >= scorePc.innerText) {
    localStorage.setItem("highScore", +scorePc.innerText);
  }
}

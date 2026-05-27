const container = document.getElementById("puzzle-container");

const positions = [
  "0px 0px",
  "-100px 0px",
  "-200px 0px",
  "0px -100px",
  "-100px -100px",
  "-200px -100px",
  "0px -200px",
  "-100px -200px",
  "-200px -200px"
];

let shuffled = [...positions].sort(() => Math.random() - 0.5);

function renderPuzzle() {
  container.innerHTML = "";

  shuffled.forEach((pos, index) => {
    const piece = document.createElement("div");

    piece.classList.add("piece");
    piece.style.backgroundPosition = pos;
    piece.draggable = true;
    piece.dataset.index = index;

    piece.addEventListener("dragstart", dragStart);
    piece.addEventListener("dragover", dragOver);
    piece.addEventListener("drop", drop);

    container.appendChild(piece);
  });
}

let dragged = null;

function dragStart() {
  dragged = this.dataset.index;
}

function dragOver(e) {
  e.preventDefault();
}

function drop() {
  const target = this.dataset.index;

  [shuffled[dragged], shuffled[target]] =
    [shuffled[target], shuffled[dragged]];

  renderPuzzle();
  checkWin();
}

function checkWin() {
  let win = true;

  for (let i = 0; i < positions.length; i++) {
    if (positions[i] !== shuffled[i]) {
      win = false;
      break;
    }
  }

  if (win) {
    setTimeout(() => {
      window.location.href = "final.html";
    }, 500);
  }
}

renderPuzzle();

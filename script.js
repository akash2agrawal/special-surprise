const container = document.getElementById('puzzle-container');

let shuffled = [...positions].sort(() => Math.random() - 0.5);

function renderPuzzle() {
  container.innerHTML = '';

  shuffled.forEach((pos, index) => {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundPosition = pos;
    piece.draggable = true;
    piece.dataset.index = index;

    piece.addEventListener('dragstart', dragStart);
    piece.addEventListener('dragover', dragOver);
    piece.addEventListener('drop', drop);

    container.appendChild(piece);
  });
}

let draggedIndex = null;

function dragStart() {
  draggedIndex = this.dataset.index;
}

function dragOver(e) {
  e.preventDefault();
}

function drop() {
  const targetIndex = this.dataset.index;

  [shuffled[draggedIndex], shuffled[targetIndex]] =
  [shuffled[targetIndex], shuffled[draggedIndex]];

  renderPuzzle();
  checkWin();
}

function checkWin() {
  const win = positions.every((pos, i) => pos === shuffled[i]);

  if (win) {
    setTimeout(() => {
      window.location.href = 'final.html';
    }, 800);
  }
}

renderPuzzle();

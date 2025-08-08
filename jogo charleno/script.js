const grid = document.getElementById('grid');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

const size = 5;
let cells = [];

function createGrid() {
  grid.innerHTML = '';
  cells = [];

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell', 'on');
    cell.dataset.index = i;
    grid.appendChild(cell);
    cells.push(cell);

    cell.addEventListener('click', () => toggleCells(i));
  }
}

// Liga/desliga um quadrado e seus vizinhos
function toggleCells(index) {
  const toggle = idx => {
    if (idx >= 0 && idx < cells.length) {
      cells[idx].classList.toggle('off');
      cells[idx].classList.toggle('on');
    }
  };

  toggle(index); // clicado
  const row = Math.floor(index / size);
  const col = index % size;

  toggle(index - size); // cima
  toggle(index + size); // baixo
  toggle(index - 1 >= row * size ? index - 1 : -1); // esquerda
  toggle(index + 1 < row * size + size ? index + 1 : -1); // direita

  checkWin();
}

function checkWin() {
  const allOff = cells.every(cell => cell.classList.contains('off'));
  if (allOff) {
    message.textContent = 'Parabéns! Você desligou todas as luzes!';
  } else {
    message.textContent = '';
  }
}

function randomizeGrid() {
  // Começa com um estado aleatório
  for (let i = 0; i < cells.length; i++) {
    if (Math.random() > 0.5) {
      cells[i].classList.add('off');
      cells[i].classList.remove('on');
    } else {
      cells[i].classList.add('on');
      cells[i].classList.remove('off');
    }
  }
  message.textContent = '';
}

resetBtn.addEventListener('click', () => {
  createGrid();
  randomizeGrid();
});

createGrid();
randomizeGrid();

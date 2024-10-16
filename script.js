const cards = [
    "img_circulo_azul_1.svg",
    "img_circulo_azul_2.svg",
    "img_circulo_azul_3.svg",
    "img_circulo_verde_1.svg",
    "img_circulo_verde_2.svg",
    "img_circulo_verde_3.svg",
    "img_circulo_vermelho_1.svg",
    "img_circulo_vermelho_2.svg",
    "img_circulo_vermelho_3.svg",
    "img_reta_azul_1.svg",
    "img_reta_azul_2.svg",
    "img_reta_azul_3.svg",
    "img_reta_verde_1.svg",
    "img_reta_verde_2.svg",
    "img_reta_verde_3.svg",
    "img_reta_vermelho_1.svg",
    "img_reta_vermelho_2.svg",
    "img_reta_vermelho_3.svg",
];

let selectedCards = [];
let score = 0;

const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const resetBtn = document.getElementById('reset-btn');

// Função para embaralhar o array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Função para iniciar o jogo
function startGame() {
    score = 0;
    selectedCards = [];
    gameBoard.innerHTML = '';
    resetBtn.style.display = 'none';
    scoreElement.textContent = score;

    const shuffledCards = shuffle(cards).slice(0, 12);

    shuffledCards.forEach((card, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = `imgs/${card}`;
        imgElement.setAttribute('data-card', card);
        imgElement.addEventListener('click', () => selectCard(imgElement));
        gameBoard.appendChild(imgElement);
    });
}

// Função para selecionar uma carta
function selectCard(cardElement) {
    if (selectedCards.length < 3 && !cardElement.classList.contains('selected')) {
        cardElement.classList.add('selected');
        selectedCards.push(cardElement);

        if (selectedCards.length === 3) {
            checkSelection();
        }
    }
}

// Função para verificar o padrão selecionado
function checkSelection() {
    const cardValues = selectedCards.map(card => card.getAttribute('data-card'));

    if (isValidSet(cardValues)) {
        showMessage('Correto!');
        score += 3;
    } else {
        showMessage('Errado!');
        score -= 3;
    }

    // Remover as cartas selecionadas
    selectedCards.forEach(card => card.remove());

    selectedCards = [];
    scoreElement.textContent = score;

    // Verifica se todas as cartas foram removidas
    if (gameBoard.childElementCount === 0) {
        endGame();
    }
}

function showMessage(text) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.style.display = 'block';
  
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 2000); 
  }
  

// Função para verificar se a seleção é válida
function isValidSet(cards) {
    const attributes = cards.map(card => card.split('_'));
    const shapes = new Set(attributes.map(attr => attr[1]));
    const colors = new Set(attributes.map(attr => attr[2]));
    const quantities = new Set(attributes.map(attr => attr[3]));

    return (shapes.size === 1 || colors.size === 1 || quantities.size === 1);
}

// Função para finalizar o jogo
function endGame() {
    showMessage(`Sua pontuação final é: ${score}`);
    resetBtn.style.display = 'block';
}

// Evento para reiniciar o jogo
resetBtn.addEventListener('click', startGame);

// Iniciar o jogo quando a página carregar
startGame();

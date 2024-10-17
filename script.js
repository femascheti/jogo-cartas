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

let cartasSelecionadas = [];
let pontos = 0;

const gameBoard = document.getElementById('game-board');
const pontosElement = document.getElementById('pontos');
const pontosBoard = document.getElementById('pontos-board'); 
const resetBtn = document.getElementById('reset-btn');

// Função para embaralhar o array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Função para iniciar o jogo
function startGame() {
    pontos = 0;
    cartasSelecionadas = [];
    gameBoard.innerHTML = '';
    resetBtn.style.display = 'none';
    pontosBoard.style.display = 'block';
    pontosElement.textContent = pontos;

    const embaralhaCartas = shuffle(cards).slice(0, 12);

    embaralhaCartas.forEach((card, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = `imgs/${card}`;
        imgElement.setAttribute('data-card', card);
        imgElement.addEventListener('click', () => cartaSelecionada(imgElement));
        gameBoard.appendChild(imgElement);
    });
}

// Função para selecionar uma carta
function cartaSelecionada(cardElement) {
    if (cartasSelecionadas.length < 3 && !cardElement.classList.contains('selected')) {
        cardElement.classList.add('selected');
        cartasSelecionadas.push(cardElement);

        if (cartasSelecionadas.length === 3) {
            validaSelecao();
        }
    }
}

// Função para verificar o padrão selecionado
function validaSelecao() {
    const cardValues = cartasSelecionadas.map(card => card.getAttribute('data-card'));

    if (isValidSet(cardValues)) {
        mostraMensagem('Correto!');
        pontos += 3;
    } else {
        mostraMensagem('Errado!');
        pontos -= 3;
    }

    // Remover as cartas selecionadas
    cartasSelecionadas.forEach(card => card.remove());

    cartasSelecionadas = [];
    pontosElement.textContent = pontos;

    // Verifica se todas as cartas foram removidas
    if (gameBoard.childElementCount === 0) {
        endGame();
    }
}

function mostraMensagem(text) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.style.display = 'block';
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
    mostraMensagem(`Sua pontuação final é: ${pontos}`);
    pontosBoard.style.display = 'none'; 
    resetBtn.style.display = 'block';
}

// Evento para reiniciar o jogo
resetBtn.addEventListener('click', startGame);

// Iniciar o jogo quando a página carregar
startGame();

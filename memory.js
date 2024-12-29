document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('memory-game');
    const scoreElement = document.getElementById('score');
    const resetButton = document.getElementById('reset-game');
    const emojis = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎢', '🎡'];
    const allEmojis = [...emojis, ...emojis];
    let cards = [];
    let flippedCards = [];
    let score = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCard(emoji) {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.emoji = emoji;
        card.addEventListener('click', flipCard);
        return card;
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            this.textContent = this.dataset.emoji;
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            score += 1;
            scoreElement.textContent = score;
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }
        flippedCards = [];

        if (score === emojis.length) {
            alert('Congratulations! You won!');
        }
    }

    function initGame() {
        gameBoard.innerHTML = '';
        cards = shuffleArray(allEmojis).map(createCard);
        cards.forEach(card => gameBoard.appendChild(card));
        score = 0;
        scoreElement.textContent = score;
    }

    resetButton.addEventListener('click', initGame);

    initGame();
});


const COLOR_WIN = '#60b347';
const COLOR_START = '#222';
const COLOR_LOSE = '#F58C75';
const HIDDEN = 'hidden';
const VISIBLE = 'visible';
const elementMessage = document.querySelector('.message');
const elementNumber = document.querySelector('.number');
const elementScore = document.querySelector('.score');
const elementHighScore = document.querySelector('.highscore');
const elementGuess = document.querySelector('.guess');
const elementButtonCheck = document.querySelector('.btn.check');
const elementButtonAgain = document.querySelector('.btn.again');
const elementAttempts = document.querySelector('.between');
let StateGame = {
    score: 0,
    highscore: 0,
    attempts: 20,
};
const StateRandom = {
    number: 0,
    generateRandon: function () {
        this.number = Math.trunc(Math.random() * 20);
    },
};
StateRandom.generateRandon();
const changeColorFont = (color) => {
    document.querySelector('body').style.backgroundColor = color;
};
const styleButtonCheck = (style) => {
    elementButtonCheck.style.visibility = style;
};
const showAttempst = () => {
    elementAttempts.textContent = `(Between ${StateGame.attempts} and 20)`;
};
const isEmpyNumber = () => !!elementGuess.value;
const isCorrectNumber = () => StateRandom.number === Number(elementGuess.value);
const addScore = () => {
    isCorrectNumber() ? StateGame.score++ : StateGame.attempts--;
};
const checkSecretNumber = () => {
    if (isCorrectNumber()) {
        elementNumber.textContent = StateRandom.number + '';
        styleButtonCheck(HIDDEN);
        changeColorFont(COLOR_WIN);
        return (elementMessage.textContent = 'Correct number 👍');
    }
    if (StateGame.attempts === 0) {
        styleButtonCheck(HIDDEN);
        changeColorFont(COLOR_LOSE);
        return (elementMessage.textContent =
            'Is not correct  number, Your lose 😱');
    }
    return Number(elementGuess.value) > StateRandom.number
        ? (elementMessage.textContent = 'Number Hight 🥵')
        : (elementMessage.textContent = 'Number Low ❄');
};
const gameGuessNumber = () => {
    if (!isEmpyNumber()) {
        return (elementMessage.textContent = 'Empy number 👀');
    }
    addScore();
    checkSecretNumber();
    showAttempst();
    elementScore.textContent = StateGame.score + '';
    return (elementGuess.value = '0');
};
const checkHighScore = () => {
    StateGame.highscore =
        StateGame.highscore > StateGame.score
            ? StateGame.highscore
            : StateGame.score;
    StateGame.score = 0;
    StateGame.attempts = 20;
    elementGuess.value = '0';
};
const gameAgain = () => {
    checkHighScore();
    changeColorFont(COLOR_START);
    StateRandom.generateRandon();
    styleButtonCheck(VISIBLE);
    showAttempst();
    elementScore.textContent = StateGame.score + '';
    elementHighScore.textContent = StateGame.highscore + '';
    elementNumber.textContent = '?';
    elementMessage.textContent = 'Start guessing...';
};
// Main
elementButtonCheck.addEventListener('click', gameGuessNumber);
elementButtonAgain.addEventListener('click', gameAgain);
export {};

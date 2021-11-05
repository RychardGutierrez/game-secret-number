import { ElementDom, ElementHtml, ElementInput } from './types';

const COLOR_WIN: string = '#60b347';
const COLOR_START: string = '#222';
const COLOR_LOSE: string = '#F58C75';

const HIDDEN = 'hidden';
const VISIBLE = 'visible';

const elementMessage: ElementDom = document.querySelector('.message');
const elementNumber: ElementDom = document.querySelector('.number');
const elementScore: ElementDom = document.querySelector('.score');
const elementHighScore: ElementDom = document.querySelector('.highscore');
const elementGuess: ElementInput = document.querySelector('.guess');
const elementButtonCheck: ElementHtml = document.querySelector('.btn.check');
const elementButtonAgain: ElementDom = document.querySelector('.btn.again');
const elementAttempts: ElementDom = document.querySelector('.between');

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

const changeColorFont = (color: string): void => {
  document.querySelector('body')!.style.backgroundColor = color;
};

const styleButtonCheck = (style: string) => {
  elementButtonCheck!.style.visibility = style;
};

const showAttempst = (): void => {
  elementAttempts!.textContent = `(Between ${StateGame.attempts} and 20)`;
};

const isEmpyNumber = (): boolean => !!elementGuess!.value;

const isCorrectNumber = (): boolean =>
  StateRandom.number === Number(elementGuess!.value);

const addScore = (): void => {
  isCorrectNumber() ? StateGame.score++ : StateGame.attempts--;
};

const checkSecretNumber = (): string => {
  if (isCorrectNumber()) {
    elementNumber!.textContent = StateRandom.number + '';

    styleButtonCheck(HIDDEN);
    changeColorFont(COLOR_WIN);
    return (elementMessage!.textContent = 'Correct number 👍');
  }

  if (StateGame.attempts === 0) {
    styleButtonCheck(HIDDEN);
    changeColorFont(COLOR_LOSE);

    return (elementMessage!.textContent =
      'Is not correct  number, Your lose 😱');
  }

  return Number(elementGuess!.value) > StateRandom.number
    ? (elementMessage!.textContent = 'Number Hight 🥵')
    : (elementMessage!.textContent = 'Number Low ❄');
};

const gameGuessNumber = (): string => {
  if (!isEmpyNumber()) {
    return (elementMessage!.textContent = 'Empy number 👀');
  }
  addScore();

  checkSecretNumber();

  showAttempst();

  elementScore!.textContent = StateGame.score + '';

  return (elementGuess!.value = '0');
};

const checkHighScore = (): void => {
  StateGame.highscore =
    StateGame.highscore > StateGame.score
      ? StateGame.highscore
      : StateGame.score;

  StateGame.score = 0;
  StateGame.attempts = 20;
  elementGuess!.value = '0';
};

const gameAgain = (): void => {
  checkHighScore();

  changeColorFont(COLOR_START);

  StateRandom.generateRandon();

  styleButtonCheck(VISIBLE);

  showAttempst();

  elementScore!.textContent = StateGame.score + '';
  elementHighScore!.textContent = StateGame.highscore + '';
  elementNumber!.textContent = '?';
  elementMessage!.textContent = 'Start guessing...';
};

// Main
elementButtonCheck!.addEventListener('click', gameGuessNumber);

elementButtonAgain!.addEventListener('click', gameAgain);

// eslint-disable-next-line import/no-extraneous-dependencies
require('normalize.css');

// normalize.css must be loaded first before app css, so disable eslint check
/* eslint-disable import/first */
import './assets/css/style.scss';
/* eslint-enable import/first */

const battleship = require('./battleship');
const battleshipUI = require('./battleshipUI');

function ready() {
  const player = window.prompt('Enter your name');
  const computerBoard = battleship.createGameboard('Computer');
  battleship.setUpComputerBoard(computerBoard);
  const playerBoard = battleship.createGameboard(player);
  const gameController = battleship.createGameController(playerBoard, computerBoard);
  battleshipUI.init(playerBoard, gameController);
}

document.addEventListener('DOMContentLoaded', ready);

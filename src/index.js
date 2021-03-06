// eslint-disable-next-line import/no-extraneous-dependencies
require('normalize.css');

// normalize.css must be loaded first before app css, so disable eslint check
/* eslint-disable import/first */
import './assets/css/style.scss';
/* eslint-enable import/first */

const battleship = require('./battleship');
const battleshipUI = require('./battleshipUI');

function ready() {
  battleshipUI.init();
}

document.addEventListener('DOMContentLoaded', ready);

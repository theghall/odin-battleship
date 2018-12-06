/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__);
// eslint-disable-next-line import/no-extraneous-dependencies
__webpack_require__(1);

// normalize.css must be loaded first before app css, so disable eslint check
/* eslint-disable import/first */

/* eslint-enable import/first */

const battleship = __webpack_require__(3);
const battleshipUI = __webpack_require__(4);

function ready() {
  battleshipUI.init();
}

document.addEventListener('DOMContentLoaded', ready);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

const battleship = {
  MISS: 0,
  HIT: 1,
  ATTACKED: 2,
  INVALID: 3,

  ships: {
    carrier: { name: 'Carrier', hull: 5 },
    battleship: { name: 'Battleship', hull: 4 },
    cruiser: { name: 'Cruiser', hull: 3 },
    submarine: { name: 'Submarine', hull: 3 },
    destroyer: { name: 'Destroyer', hull: 2 },
  },

  computerSetup1: () => [
    {
      ship: battleship.ships.carrier,
      position: { bowCoordinates: 'A4', bowDirection: 270 },
    },
    {
      ship: battleship.ships.battleship,
      position: { bowCoordinates: 'F6', bowDirection: 0 },
    },
    {
      ship: battleship.ships.cruiser,
      position: { bowCoordinates: 'I2', bowDirection: 0 },
    },
    {
      ship: battleship.ships.submarine,
      position: { bowCoordinates: 'I8', bowDirection: 0 },
    },
    {
      ship: battleship.ships.destroyer,
      position: { bowCoordinates: 'B8', bowDirection: 0 },
    },
  ],

  computerSetup2: () => [
    {
      ship: battleship.ships.carrier,
      position: { bowCoordinates: 'F2', bowDirection: 270 },
    },
    {
      ship: battleship.ships.battleship,
      position: { bowCoordinates: 'F5', bowDirection: 270 },
    },
    {
      ship: battleship.ships.cruiser,
      position: { bowCoordinates: 'F7', bowDirection: 270 },
    },
    {
      ship: battleship.ships.submarine,
      position: { bowCoordinates: 'C6', bowDirection: 0 },
    },
    {
      ship: battleship.ships.destroyer,
      position: { bowCoordinates: 'C2', bowDirection: 0 },
    },
  ],

  computerSetup3: () => [
    {
      ship: battleship.ships.carrier,
      position: { bowCoordinates: 'B5', bowDirection: 0 },
    },
    {
      ship: battleship.ships.battleship,
      position: { bowCoordinates: 'G2', bowDirection: 0 },
    },
    {
      ship: battleship.ships.cruiser,
      position: { bowCoordinates: 'D8', bowDirection: 0 },
    },
    {
      ship: battleship.ships.submarine,
      position: { bowCoordinates: 'J5', bowDirection: 0 },
    },
    {
      ship: battleship.ships.destroyer,
      position: { bowCoordinates: 'J1', bowDirection: 0 },
    },
  ],

  shipGetter: state => ({
    getName: () => state.name,
    getLength: () => state.hull.length,
  }),

  positionable: state => ({
    setPosition: position => {
      state.position = position;
    },
    getPosition: () => state.position,
  }),

  sinkable: state => ({
    hit: pos => {
      state.hull[pos] = true;
    },
    isHit: pos => {
      {
        return state.hull[pos] === true;
      }
    },
    isSunk: () => !state.hull.includes(false),
  }),

  createShip(ship) {
    const hull = [];
    // Mark each hull position as not hit
    for (let i = 0; i < ship.hull; i += 1) {
      hull.push(false);
    }
    const state = {
      name: ship.name,
      hull: hull,
      position: { bowCoordinates: null, bowDirection: null },
    };
    return Object.assign(
      {},
      battleship.shipGetter(state),
      battleship.sinkable(state),
      battleship.positionable(state)
    );
  },

  boardGetter: state => ({
    getPlayerName: () => state.player,
  }),

  attackable: (state, helpers) => ({
    receiveAttack: coordinates => {
      if (!helpers.validCoordinates(coordinates)) {
        return battleship.INVALID;
      }

      if (!helpers.alreadyAttacked(coordinates, state, helpers)) {
        return helpers.markAttacked(coordinates, state, helpers);
      } else {
        return battleship.ATTACKED;
      }
    },
  }),

  tokenable: (state, helpers) => ({
    placeShip: (ship, shipPosition) => {
      const shipCopy = Object.assign({}, ship);

      helpers.validateShipPosition(shipPosition, helpers);

      helpers.validateShipPlacement(shipCopy, shipPosition, state, helpers);

      helpers.placeShip(shipCopy, shipPosition, state, helpers);
    },

    removeShip: ship => {
      const shipPosition = ship.getPosition();
      const { row, col } = helpers.getRowCol(shipPosition.bowCoordinates);

      ship.setPosition({ bowCoordinates: null, bowDirection: null });
      state.ships.splice(state.ships.indexOf(ship));

      let posRow = row;
      let posCol = col;

      for (let pos = 0; pos < ship.getLength(); pos += 1) {
        state.board[posRow][posCol] = '';
        const rowCol = helpers.calcNextRowCol(
          posRow,
          posCol,
          shipPosition.bowDirection
        );
        posRow = rowCol.newRow;
        posCol = rowCol.newCol;
      }
    },

    allShipsPlaced: () => {
      let allPlaced = true;
      let neededShips = [];
      let placedShips = [];

      for (let key in battleship.ships) {
        neededShips.push(battleship.ships[key].name);
      }

      for (let i = 0; i < state.ships.length; i += 1) {
        placedShips.push(state.ships[i].getName());
      }

      for (let i = 0; i < neededShips.length && allPlaced; i += 1) {
        allPlaced = placedShips.includes(neededShips[i]);
      }

      return allPlaced;
    },

    allShipsSunk: () => {
      let sunk = [];

      for (let i = 0; i < state.ships.length; i += 1) {
        sunk.push(state.ships[i].isSunk());
      }

      return !sunk.includes(false);
    },

    getShip: shipDesc => {
      let ship = null;

      for (let i = 0; i < state.ships.length; i += 1) {
        if (state.ships[i].getName() === shipDesc.name) {
          ship = state.ships[i];
          break;
        }
      }

      return Object.assign({}, ship);
    },
    getSunkShips: () => {
      let sunkShips = [];

      for (let i = 0; i < state.ships.length; i += 1) {
        if (state.ships[i].isSunk()) {
          sunkShips.push(state.ships[i].getName());
        }
      }

      return sunkShips;
    },
  }),

  boardHelpers: {
    calcNextRowCol(row, col, bowDirection) {
      let newRow = row;
      let newCol = col;
      switch (bowDirection) {
        case 0:
          newRow += 1;
          break;
        case 90:
          newCol -= 1;
          break;
        case 180:
          newRow -= 1;
          break;
        case 270:
          newCol += 1;
          break;
      }
      return { newRow: newRow, newCol: newCol };
    },

    placeShip(ship, shipPosition, state, helpers) {
      const { row, col } = helpers.getRowCol(shipPosition.bowCoordinates);

      ship.setPosition(shipPosition);
      state.ships.push(ship);

      let posRow = row;
      let posCol = col;

      for (let pos = 0; pos < ship.getLength(); pos += 1) {
        state.board[posRow][posCol] = ship;
        const rowCol = helpers.calcNextRowCol(
          posRow,
          posCol,
          shipPosition.bowDirection
        );
        posRow = rowCol.newRow;
        posCol = rowCol.newCol;
      }
    },

    validCoordinates(coordinates) {
      return /^[A-J][1-9]0?$/.test(coordinates);
    },

    validBowDirection(bowDirection) {
      const directions = [0, 90, 180, 270];
      return directions.includes(bowDirection);
    },

    validateShipPlacement(ship, shipPosition, state, helpers) {
      const { row, col } = helpers.getRowCol(shipPosition.bowCoordinates);

      // Check if any part of ship is off board or overlaps another ship
      let checkCol = col;
      let checkRow = row;

      for (let pos = 0; pos < ship.getLength(); pos += 1) {
        if (checkCol < 0 || checkCol > 9 || checkRow < 0 || checkRow > 9) {
          throw 'No part of ship can be placed off the board';
        }
        if (typeof state.board[checkRow][checkCol] === 'object') {
          throw 'No part of ship can overlap another ship';
        }
        const rowCol = helpers.calcNextRowCol(
          checkRow,
          checkCol,
          shipPosition.bowDirection
        );

        checkRow = rowCol.newRow;
        checkCol = rowCol.newCol;
      }
    },

    validateShipPosition(shipPosition, helpers) {
      if (!helpers.validCoordinates(shipPosition.bowCoordinates)) {
        throw 'Ship position is invalid';
      }

      if (!helpers.validBowDirection(shipPosition.bowDirection)) {
        throw 'Ship must have a direction of 0, 90, 180 or 270';
      }
    },

    getRowCol(coordinates) {
      const col = coordinates.charCodeAt(0) - 65;
      const row = parseInt(coordinates.substring(1, 3), 10) - 1;
      return { row: row, col: col };
    },

    getHullPosition(ship, bRow, bCol, helpers) {
      const shipPostion = ship.getPosition();
      const bowRowCol = helpers.getRowCol(shipPostion.bowCoordinates);
      const bowDirection = shipPostion.bowDirection;

      let position;

      switch (bowDirection) {
        case 0:
          position = bRow - bowRowCol.row;
          break;
        case 90:
          position = bowRowCol.col - bCol;
          break;
        case 180:
          position = bowRowCol.row - bRow;
          break;
        case 270:
          position = bCol - bowRowCol.col;
          break;
      }

      return position;
    },

    alreadyAttacked(coordinates, state, helpers) {
      const { row, col } = helpers.getRowCol(coordinates);
      const gridContent = state.board[row][col];

      if (typeof gridContent === 'object') {
        const hullPosition = helpers.getHullPosition(
          gridContent,
          row,
          col,
          helpers
        );
        if (gridContent.isHit(hullPosition)) {
          return true;
        }
      } else if (gridContent === battleship.MISS) {
        return true;
      }
      return false;
    },

    markAttacked(coordinates, state, helpers) {
      const { row, col } = helpers.getRowCol(coordinates);
      const gridContent = state.board[row][col];

      if (typeof gridContent === 'object') {
        const hullPosition = helpers.getHullPosition(
          gridContent,
          row,
          col,
          helpers
        );
        gridContent.hit(hullPosition);
        return battleship.HIT;
      } else {
        state.board[row][col] = battleship.MISS;
        return battleship.MISS;
      }
    },
  },

  createGameboard(player) {
    const board = [[], [], [], [], [], [], [], [], [], []];

    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        board[row][col] = '';
      }
    }

    const state = {
      player: player,
      board: board,
      ships: [],
    };

    return Object.assign(
      {},
      battleship.boardGetter(state),
      battleship.attackable(state, battleship.boardHelpers),
      battleship.tokenable(state, battleship.boardHelpers)
    );
  },

  reportable: state => ({
    getStatus: () => state.gameStatus,
  }),

  phaseable: (state, helpers) => ({
    finalizePlacement: () => {
      if (state.phase !== 'setup') {
        throw 'An internal error occured';
      }

      const board1 = state.gameboards[0];
      const board2 = state.gameboards[1];
      const player1 = board1.getPlayerName();
      const player2 = board2.getPlayerName();

      if (board1.allShipsPlaced() && board2.allShipsPlaced()) {
        state.gameStatus = `${player1}, your turn`;
        state.activeGameboard = board2;
        state.phase = 'playing';
      } else if (board1.allShipsPlaced()) {
        state.gameStatus = `${player2} is thinking...`;
      } else if (board2.allShipsPlaced()) {
        state.gameStatus = `${player1} is thinking...`;
      }
    },

    attack: coordinates => {
      if (state.phase !== 'playing') {
        throw 'An internal error occured';
      }

      const board1 = state.gameboards[0];
      const board2 = state.gameboards[1];
      const player1 = board1.getPlayerName();
      const player2 = board2.getPlayerName();

      const result = state.activeGameboard.receiveAttack(coordinates);

      if (state.activeGameboard.allShipsSunk()) {
        helpers.setGameOver(state, player1, player2, board1);
      }

      if (state.phase !== 'over' && result !== battleship.ATTACKED) {
        helpers.setActiveGameboard(state, player1, player2, board1, board2);
      }

      return result;
    },
    getPhase: () => state.phase,
  }),

  gcHelpers: {
    setGameOver(state, player1, player2, board1) {
      if (state.activeGameboard === board1) {
        state.winner = player2;
      } else {
        state.winner = player1;
      }
      state.phase = 'over';
      state.gameStatus = `${state.winner} is the winner`;
    },

    setActiveGameboard(state, player1, player2, board1, board2) {
      if (state.activeGameboard === board2) {
        state.gameStatus = `${player2} is thinking...`;
        state.activeGameboard = board1;
      } else {
        state.gameStatus = `${player1}, your turn`;
        state.activeGameboard = board2;
      }
    },
  },

  createGameController(board1, board2) {
    const state = {
      phase: 'setup',
      activeGameboard: null,
      gameboards: [board1, board2],
      winner: null,
      gameStatus: 'Place your ships',
    };

    return Object.assign(
      {},
      battleship.reportable(state),
      battleship.phaseable(state, battleship.gcHelpers)
    );
  },

  setUpComputerBoard(gameboard) {
    const setups = [
      battleship.computerSetup1,
      battleship.computerSetup2,
      battleship.computerSetup3,
    ];

    const setup = setups[Math.floor(Math.random() * 3)]();

    for (let i = 0; i < setup.length; i += 1) {
      const aShip = battleship.createShip(setup[i].ship);
      gameboard.placeShip(aShip, setup[i].position);
    }
  },

  getComputerAttackCoordinates() {
    const col = String.fromCharCode(65 + Math.floor(Math.random() * 10));
    const row = Math.floor(Math.random() * 10) + 1;
    return `${col}${row}`;
  },
};

module.exports = battleship;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const battleship = __webpack_require__(3);

const smallExplosion = __webpack_require__(5);
const largeExplosion = __webpack_require__(6);
const smallSplash = __webpack_require__(7);
const largeSplash = __webpack_require__(8);

const battleshipUI = {
  interfaces: {
    playerBoard: null,
    computerBoard: null,
    gameController: null,
  },

  getShipCoordsName(ship) {
    return `${ship}-bowpos`;
  },

  getShipDirectionName(ship) {
    return `${ship}-bowdir`;
  },

  getShip(ship) {
    switch (ship) {
      case 'carrier':
        return battleship.ships.carrier;
        break;
      case 'battleship':
        return battleship.ships.battleship;
        break;
      case 'cruiser':
        return battleship.ships.cruiser;
        break;
      case 'submarine':
        return battleship.ships.submarine;
        break;
      case 'destroyer':
        return battleship.ships.destroyer;
        break;
    }
  },

  getNextGridCoord(gridCoord, bowDirection) {
    let colCharCode = gridCoord.charCodeAt(0);
    let row = parseInt(gridCoord.substring(1, 3));

    switch (bowDirection) {
      case 0:
        row += 1;
        break;
      case 90:
        colCharCode -= 1;
        break;
      case 180:
        row -= 1;
        break;
      case 270:
        colCharCode += 1;
        break;
    }

    return `${String.fromCharCode(colCharCode)}${row}`;
  },

  updateInfo(msg) {
    const info = document.getElementById('info');
    info.textContent = msg;
  },

  clearInfo() {
    const info = document.getElementById('info');
    info.textContent = '';
  },

  markSquares(shipObject) {
    const shipPosition = shipObject.getPosition();
    let markCoords = shipPosition.bowCoordinates;
    const bowDirection = shipPosition.bowDirection;

    for (let i = 0; i < shipObject.getLength(); i += 1) {
      const cell = document.getElementById(markCoords);
      cell.classList.add('gray');
      markCoords = battleshipUI.getNextGridCoord(markCoords, bowDirection);
    }
  },

  clearSquares(shipObject) {
    const shipPosition = shipObject.getPosition();
    let markCoords = shipPosition.bowCoordinates;
    const bowDirection = shipPosition.bowDirection;

    for (let i = 0; i < shipObject.getLength(); i += 1) {
      const cell = document.getElementById(markCoords);
      cell.classList.remove('gray');
      markCoords = battleshipUI.getNextGridCoord(markCoords, bowDirection);
    }
  },

  placeShip(ship, position) {
    const shipObject = battleship.createShip(
      battleshipUI.getShip(ship),
      position
    );

    try {
      battleshipUI.interfaces.playerBoard.placeShip(shipObject, position);
      battleshipUI.markSquares(shipObject);
    } catch (e) {
      battleshipUI.updateInfo(e);
      throw(e);
    }
  },

  getShipDesc(shipName) {
    let shipDesc;

    switch (shipName) {
      case 'carrier':
        shipDesc = battleship.ships.carrier;
        break;
      case 'battleship':
        shipDesc = battleship.ships.battleship;
        break;
      case 'cruiser':
        shipDesc = battleship.ships.cruiser;
        break;
      case 'submarine':
        shipDesc = battleship.ships.submarine;
        break;
      case 'destroyer':
        shipDesc = battleship.ships.destroyer;
        break;
    }

    return shipDesc;
  },

  removeShip(shipName) {
    const shipObject = battleshipUI.interfaces.playerBoard.getShip(
      battleshipUI.getShipDesc(shipName)
    );

    battleshipUI.clearSquares(shipObject);
    battleshipUI.interfaces.playerBoard.removeShip(shipObject);
  },

  removeElement(id) {
    const placement = document.getElementById(id);
    placement.parentNode.removeChild(placement);
  },

  minimizePlayerBoard() {
    const playerBoard = document.getElementById('player-board');
    playerBoard.classList.remove('maximize');
    playerBoard.classList.add('minimize');
  },

  createAttackGrid() {
    const computerGrid = battleshipUI.createBattleshipGrid('computer-board');
    computerGrid.addEventListener(
      'click',
      battleshipUI.listeners.attackHandler
    );
    return computerGrid;
  },

  addAttackPageRow1(attackWrapper) {
    // Add empty cell
    attackWrapper.appendChild(document.createElement('div'));
    //  Add messages cell
    const messages = battleshipUI.createWrapperElement('messages');
    messages.appendChild(battleshipUI.createWrapperElement('status'));
    messages.appendChild(battleshipUI.createWrapperElement('info'));
    attackWrapper.appendChild(messages);
    // Add empty cell
    attackWrapper.appendChild(document.createElement('div'));
  },

  addAttackPageRow2(attackWrapper, oldPlayerBoard) {
    // Add Player sideboard
    const playerSideBoard = battleshipUI.createWrapperElement(
      'player-sideboard'
    );
    playerSideBoard.appendChild(oldPlayerBoard);
    playerSideBoard.appendChild(
      battleshipUI.createWrapperElement('player-sunk')
    );
    attackWrapper.appendChild(playerSideBoard);
    // Add Attack grid
    attackWrapper.appendChild(battleshipUI.createAttackGrid());
    // Add computer sideboard
    const computerSideBoard = battleshipUI.createWrapperElement(
      'computer-sideboard'
    );
    computerSideBoard.appendChild(
      battleshipUI.createWrapperElement('computer-sunk')
    );
    attackWrapper.appendChild(computerSideBoard);
  },

  updateAllStatus() {
    battleshipUI.updateStatus(
      battleshipUI.interfaces.gameController.getStatus()
    );
    battleshipUI.updateInfo('Click on a square to attack it');
    battleshipUI.updatePlayerSideboard();
    battleshipUI.updateComputerSideboard();
  },

  buildAttackPage() {
    const rootElement = battleshipUI.getRootElement();
    const playerBoard = document.getElementById('player-board');

    battleshipUI.minimizePlayerBoard();
    const oldPlayerBoard = playerBoard.parentNode.removeChild(playerBoard);

    battleshipUI.removeElement('setup-page');

    const attackWrapper = battleshipUI.createWrapperElement('attack-page');

    battleshipUI.addAttackPageRow1(attackWrapper);
    battleshipUI.addAttackPageRow2(attackWrapper, oldPlayerBoard);

    rootElement.appendChild(attackWrapper);

    battleshipUI.updateAllStatus();
  },

  setImage(cell, image) {
    cell.innerHTML = `<img src="${image}">`;
  },

  markPlayerResult(cell, result) {
    switch (result) {
      case battleship.HIT:
        battleshipUI.setImage(cell, largeExplosion);
        break;
      case battleship.MISS:
        battleshipUI.setImage(cell, largeSplash);
        break;
    }
  },

  markComputerResult(attackCoordinates, result) {
    const cell = document.querySelector(`#player-board #${attackCoordinates}`);

    switch (result) {
      case battleship.HIT:
        battleshipUI.setImage(cell, smallExplosion);
        break;
      case battleship.MISS:
        battleshipUI.setImage(cell, smallSplash);
        break;
    }
  },

  updateShipsSunk(elem, title, sunkShips) {
    const newElem = battleshipUI.createWrapperElement(elem.id);
    const ul = document.createElement('ul');
    const listTitle = document.createElement('p');
    listTitle.textContent = title;

    newElem.appendChild(listTitle);
    newElem.appendChild(ul);

    for (let i = 0; i < sunkShips.length; i += 1) {
      const li = document.createElement('li');
      li.textContent = sunkShips[i];
      ul.appendChild(li);
    }
    const parentElem = elem.parentNode;
    parentElem.replaceChild(newElem, elem);
  },

  updatePlayerSideboard() {
    const playerShipsSunkElem = document.getElementById('player-sunk');
    const playerShipsSunk = battleshipUI.interfaces.playerBoard.getSunkShips();

    battleshipUI.updateShipsSunk(
      playerShipsSunkElem,
      'Your ships sunk:',
      playerShipsSunk
    );
  },

  updateComputerSideboard() {
    const computerShipsSunkElem = document.getElementById('computer-sunk');
    const computerShipsSunk = battleshipUI.interfaces.computerBoard.getSunkShips();

    battleshipUI.updateShipsSunk(
      computerShipsSunkElem,
      'Computer ships sunk:',
      computerShipsSunk
    );
  },

  doPlayerAttack(cell) {
    const playerResult = battleshipUI.interfaces.gameController.attack(cell.id);

    if (playerResult === battleship.HIT || playerResult === battleship.MISS) {
      battleshipUI.markPlayerResult(cell, playerResult);
      battleshipUI.updateStatus(
        battleshipUI.interfaces.gameController.getStatus()
      );
      battleshipUI.updateComputerSideboard();
    } else {
      battleshipUI.updateInfo('That square has already been attacked');
    }

    return playerResult;
  },

  doComputerAttack() {
    let attackCoordinates = null;
    let computerResult = null;

    while (
      computerResult !== battleship.HIT &&
      computerResult !== battleship.MISS
    ) {
      attackCoordinates = battleship.getComputerAttackCoordinates();
      try {
        computerResult = battleshipUI.interfaces.gameController.attack(
          attackCoordinates
        );
      } catch (e) {
        alert(e);
        break;
      }

      if (computerResult === battleship.INVALID) {
        alert(
          `An internal error occured. Computer tried to attack ${attackCoordinates}`
        );
        break;
      }
      battleshipUI.updatePlayerSideboard();
    }

    battleshipUI.markComputerResult(attackCoordinates, computerResult);

    battleshipUI.updateStatus(
      battleshipUI.interfaces.gameController.getStatus()
    );
  },

  startNewGame(playerName) {
    const rootElement = battleshipUI.getRootElement();
    const child = rootElement.firstChild;

    if (child !== null) {
      rootElement.removeChild(child);
    }

    const replay = document.getElementById('replay');
    if (replay !== null) {
      rootElement.removeChild(replay);
    }

    battleshipUI.interfaces.playerBoard = battleship.createGameboard(
      playerName
    );
    battleshipUI.interfaces.computerBoard = battleship.createGameboard(
      'Computer'
    );
    battleship.setUpComputerBoard(battleshipUI.interfaces.computerBoard);
    battleshipUI.interfaces.gameController = battleship.createGameController(
      battleshipUI.interfaces.playerBoard,
      battleshipUI.interfaces.computerBoard
    );
    battleshipUI.buildInitalPage();
  },

  addReplayButton() {
    const root = battleshipUI.getRootElement();
    const button = document.createElement('button');
    button.id = 'replay';
    button.setAttribute('type', 'button');
    button.textContent = 'Play Again';
    button.classList.add('btn');
    button.addEventListener('click', battleshipUI.listeners.handleReplay);

    root.appendChild(button);
  },

  listeners: {
    handleNameForm(e) {
      e.preventDefault();

      const form = e.target.parentNode;
      const playerName = form.querySelector('input[name="player-name"]');

      if (playerName.value != '') {
        const welcome = document.getElementById('welcome');
        welcome.parentNode.removeChild(welcome);

        battleshipUI.startNewGame(playerName.value);
      } else {
        alert('Name must not be blank.');
      }
    },

    placeHandler(e) {
      e.preventDefault();

      const row = e.target.parentNode.parentNode;
      const shipName = row.firstChild.textContent;
      const bowCoordinates = row.querySelector(
        `input[name=${battleshipUI.getShipCoordsName(shipName)}`
      );
      let bowCoordinatesVal = bowCoordinates.value;
      bowCoordinatesVal = bowCoordinatesVal.charAt(0).toUpperCase() + bowCoordinatesVal.slice(1);
      bowCoordinates.value = bowCoordinatesVal;
      const bowDirection = parseInt(
        row.querySelector(
          `select[name=${battleshipUI.getShipDirectionName(shipName)}`
        ).value,
        10
      );

      battleshipUI.clearInfo();

      try {
        battleshipUI.placeShip(shipName, {
          bowCoordinates: bowCoordinatesVal,
          bowDirection: bowDirection,
        });
        e.target.setAttribute('disabled', 'disabled');
        e.target.nextSibling.removeAttribute('disabled');
      } catch (e) {
        // Just doing a try to see if ship placed successfully
      }
    },

    removeHandler(e) {
      e.preventDefault();

      const row = e.target.parentNode.parentNode;
      const shipName = row.firstChild.textContent;

      battleshipUI.clearInfo();
      battleshipUI.removeShip(shipName);
      e.target.setAttribute('disabled', 'disabled');
      e.target.previousSibling.removeAttribute('disabled');
    },

    attackHandler(e) {
      e.preventDefault();
      const cell = e.target.nodeName === 'IMG' ? e.target.parentNode : e.target;

      let gamePhase = battleshipUI.interfaces.gameController.getPhase();

      battleshipUI.clearInfo();

      if (gamePhase !== 'over') {
        const result = battleshipUI.doPlayerAttack(cell);

        gamePhase = battleshipUI.interfaces.gameController.getPhase();

        if (result !== battleship.ATTACKED && gamePhase !== 'over') {
          battleshipUI.doComputerAttack();
        }
      }

      if (gamePhase === 'over' && !document.getElementById('replay')) {
        battleshipUI.addReplayButton();
      }
    },

    finalizePlacementHandler(e) {
      e.preventDefault();

      if (battleshipUI.interfaces.playerBoard.allShipsPlaced()) {
        battleshipUI.interfaces.gameController.finalizePlacement();
        battleshipUI.updateStatus(
          battleshipUI.interfaces.gameController.getStatus()
        );
        battleshipUI.buildAttackPage();
      } else {
        battleshipUI.updateInfo('You have not placed all your ships');
      }
    },

    handleReplay(e) {
      e.preventDefault();
      battleshipUI.startNewGame(
        battleshipUI.interfaces.playerBoard.getPlayerName()
      );
    },
  },

  getRootElement() {
    return document.getElementById('root');
  },

  getGridCoordinates(row, col) {
    const gridCol = String.fromCharCode(65 + (col - 1));

    return `${gridCol}${row}`;
  },

  addGridCells(gridContainer) {
    for (let row = 0; row < 11; row += 1) {
      for (let col = 0; col < 11; col += 1) {
        const cell = document.createElement('div');
        if (row === 0 && col > 0) {
          cell.textContent = String.fromCharCode(65 + (col - 1));
          cell.classList.add('row-header');
        }
        if (col == 0 && row > 0) {
          cell.textContent = row;
          cell.classList.add('col-header');
        }
        if (row !== 0 && col !== 0) {
          cell.id = battleshipUI.getGridCoordinates(row, col);
          cell.classList.add('cell');
        }
        gridContainer.appendChild(cell);
      }
    }
  },

  createBattleshipGrid(id) {
    const gridContainer = document.createElement('div');
    gridContainer.id = id;
    gridContainer.classList.add('battle-grid');
    gridContainer.classList.add('maximize');

    battleshipUI.addGridCells(gridContainer);

    return gridContainer;
  },

  createPlacementTableHeader() {
    const headers = ['Ship', 'Bow Position', 'Bow Direction', 'Actions'];

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (let i = 0; i < headers.length; i += 1) {
      const td = document.createElement('th');
      td.textContent = headers[i];
      tr.appendChild(td);
    }

    thead.appendChild(tr);
    return thead;
  },

  createPositionInput(ship) {
    const td = document.createElement('td');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', `${ship}-bowpos`);

    td.appendChild(input);

    return td;
  },

  createDirectionSelect(ship) {
    const positions = ['0', '90', '180', '270'];
    const td = document.createElement('td');
    const select = document.createElement('select');
    const options = document.createElement('options');
    const name = `${ship}-bowdir`;

    select.setAttribute('name', name);

    for (let i = 0; i < positions.length; i += 1) {
      const option = document.createElement('option');
      option.textContent = positions[i];
      select.appendChild(option);
    }

    td.appendChild(select);

    return td;
  },

  createButton(content, callback, disable = false) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    if (disable) {
      button.setAttribute('disabled', 'disabled');
    }
    button.textContent = content;
    button.classList.add('btn');
    button.addEventListener('click', callback);

    return button;
  },

  createActionButtons() {
    const td = document.createElement('td');

    td.appendChild(
      battleshipUI.createButton('Place', battleshipUI.listeners.placeHandler)
    );
    td.appendChild(
      battleshipUI.createButton('Remove', battleshipUI.listeners.removeHandler, true)
    );

    return td;
  },

  addPlacementTableRows(ships, table) {
    const tbody = document.createElement('tbody');

    for (let i = 0; i < ships.length; i += 1) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');

      td.textContent = ships[i];
      tr.appendChild(td);

      tr.appendChild(battleshipUI.createPositionInput(ships[i]));
      tr.appendChild(battleshipUI.createDirectionSelect(ships[i]));
      tr.appendChild(battleshipUI.createActionButtons());

      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
  },

  createPlacementTable() {
    const ships = [
      'carrier',
      'battleship',
      'cruiser',
      'submarine',
      'destroyer',
    ];

    const table = document.createElement('table');

    table.appendChild(battleshipUI.createPlacementTableHeader());
    battleshipUI.addPlacementTableRows(ships, table);

    return table;
  },

  createPlacementContainer() {
    const div = document.createElement('div');
    div.id = 'placement';

    div.appendChild(battleshipUI.createPlacementTable());
    div.appendChild(
      battleshipUI.createButton(
        'Finalize Placement',
        battleshipUI.listeners.finalizePlacementHandler
      )
    );

    return div;
  },

  createWrapperElement(id) {
    const div = document.createElement('div');
    div.id = id;
    return div;
  },

  createNoticeElement(id) {
    const div = document.createElement('div');
    div.id = id;
    return div;
  },

  updatInfo(text) {
    const infoElem = document.getElementById('info');

    infoElem.textContent = text;
  },
  updateStatus(text) {
    const statusElem = document.getElementById('status');

    statusElem.textContent = text;
  },

  buildInitalPage() {
    const rootElement = battleshipUI.getRootElement();

    const setupPage = battleshipUI.createWrapperElement('setup-page');
    setupPage.appendChild(battleshipUI.createNoticeElement('status'));
    setupPage.appendChild(battleshipUI.createNoticeElement('info'));
    setupPage.appendChild(battleshipUI.createBattleshipGrid('player-board'));
    setupPage.appendChild(
      battleshipUI.createPlacementContainer(battleshipUI.listeners.placeHandler)
    );
    rootElement.appendChild(setupPage);

    battleshipUI.updateStatus(
      battleshipUI.interfaces.gameController.getStatus()
    );
  },

  buildNameForm() {
    const rootElement = battleshipUI.getRootElement();

    const div = battleshipUI.createWrapperElement('welcome');
    const p = document.createElement('p');
    p.textContent = 'Welcome to Battleship!';
    div.appendChild(p);

    const form = document.createElement('form');
    form.id = 'player-name';
    form.setAttribute('action', '#');

    const label = document.createElement('label');
    label.setAttribute('for', 'player-name');
    label.textContent = 'Name:';
    form.appendChild(label);

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'player-name');
    input.setAttribute('required', 'required');
    form.appendChild(input);

    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Enter Game');
    submit.classList.add('btn');
    form.append(submit);

    submit.addEventListener('click', battleshipUI.listeners.handleNameForm);

    div.append(form);
    rootElement.appendChild(div);
  },

  init(playerBoard, computerBoard, gameController) {
    battleshipUI.buildNameForm();
  },
};

module.exports = battleshipUI;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/graphics/explosion10x10.png";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/graphics/explosion20x20.png";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/graphics/splash10x10.jpg";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/graphics/splash20x20.jpg";

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
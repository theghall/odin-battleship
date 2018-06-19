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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);\n/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n// eslint-disable-next-line import/no-extraneous-dependencies\n__webpack_require__(1);\n\n// normalize.css must be loaded first before app css, so disable eslint check\n/* eslint-disable import/first */\n\n/* eslint-enable import/first */\n\nconst battleship = __webpack_require__(3);\nconst battleshipUI = __webpack_require__(4);\n\nfunction ready() {\n  const player = window.prompt('Enter your name');\n  const computerBoard = battleship.createGameboard('Computer');\n  battleship.setUpComputerBoard(computerBoard);\n  const playerBoard = battleship.createGameboard(player);\n  const gameController = battleship.createGameController(playerBoard, computerBoard);\n  battleshipUI.init(playerBoard, gameController);\n}\n\ndocument.addEventListener('DOMContentLoaded', ready);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./node_modules/normalize.css/normalize.css?");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/assets/css/style.scss?");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

eval("const battleship = {\n  MISS: 0,\n  HIT: 1,\n  ATTACKED: 2,\n  INVALID: 3,\n\n  ships: {\n    carrier: { name: 'Carrier', hull: 5 },\n    battleship: { name: 'Battleship', hull: 4 },\n    cruiser: { name: 'Cruiser', hull: 3 },\n    submarine: { name: 'Submarine', hull: 3 },\n    destroyer: { name: 'Destroyer', hull: 2 },\n  },\n\n  computerSetup1: () => [\n    {ship: battleship.ships.carrier, position: {bowCoordinates: 'A4', bowDirection: 270}},\n    {ship: battleship.ships.battleship, position: {bowCoordinates: 'F6', bowDirection: 0}},\n    {ship: battleship.ships.cruiser, position: {bowCoordinates: 'I2', bowDirection: 0}},\n    {ship: battleship.ships.submarine, position: {bowCoordinates: 'I8', bowDirection: 0}},\n    {ship: battleship.ships.destroyer, position: {bowCoordinates: 'B8', bowDirection: 0}},\n  ],\n  \n  computerSetup2: () => [\n    {ship: battleship.ships.carrier, position: {bowCoordinates: 'F2', bowDirection: 270}},\n    {ship: battleship.ships.battleship, position: {bowCoordinates: 'F5', bowDirection: 270}},\n    {ship: battleship.ships.cruiser, position: {bowCoordinates: 'F7', bowDirection: 270}},\n    {ship: battleship.ships.submarine, position: {bowCoordinates: 'C6', bowDirection: 0}},\n    {ship: battleship.ships.destroyer, position: {bowCoordinates: 'C2', bowDirection: 0}}\n  ],\n\n  computerSetup3: () => [\n    {ship: battleship.ships.carrier, position: {bowCoordinates: 'B5', bowDirection: 0}},\n    {ship: battleship.ships.battleship, position: {bowCoordinates: 'G2', bowDirection: 0}},\n    {ship: battleship.ships.cruiser, position: {bowCoordinates: 'D8', bowDirection: 0}},\n    {ship: battleship.ships.submarine, position: {bowCoordinates: 'J5', bowDirection: 0}},\n    {ship: battleship.ships.destroyer, position: {bowCoordinates: 'J1', bowDirection: 0}}\n  ],\n\n  shipGetter: state => ({\n    getName: () => state.name,\n    getLength: () => state.hull.length,\n  }),\n\n  positionable: state => ({\n    setPosition: position => {\n      state.position = position;\n    },\n    getPosition: () => state.position,\n  }),\n\n  sinkable: state => ({\n    hit: pos => {\n      state.hull[pos] = true;\n    },\n    isHit: pos => {\n      { return state.hull[pos] === true; }\n    },\n    isSunk: () => !state.hull.includes(false),\n  }),\n\n  createShip(ship) {\n    const hull = [];\n    // Mark each hull position as not hit\n    for (let i = 0; i < ship.hull; i += 1) {\n      hull.push(false);\n    }\n    const state = {\n      name: ship.name,\n      hull: hull,\n      position: { bowCoordinates: null, bowDirection: null },\n    };\n    return Object.assign(\n      {},\n      battleship.shipGetter(state),\n      battleship.sinkable(state),\n      battleship.positionable(state)\n    );\n  },\n\n  boardGetter: state => ({\n    getPlayerName: () => state.player,\n  }),\n\n  attackable: (state, helpers) => ({\n    receiveAttack: (coordinates) => {\n      if (!helpers.validCoordinates(coordinates)) {\n        return(battleship.INVALID);\n      }\n\n      if (!helpers.alreadyAttacked(coordinates, state, helpers)) {\n        return helpers.markAttacked(coordinates, state, helpers);\n      } else {\n        return battleship.ATTACKED;\n     }\n   }\n  }),\n\n  tokenable: (state, helpers) => ({\n    placeShip: (ship, shipPosition) => {\n      helpers.validateShipPosition(shipPosition, helpers);\n\n      helpers.validateShipPlacement(ship, shipPosition, state, helpers);\n\n      helpers.placeShip(ship, shipPosition, state, helpers);\n    },\n\n    removeShip: (ship) => {\n      const shipPosition = ship.getPosition();\n      const {row, col}  = helpers.getRowCol(shipPosition.bowCoordinates);\n\n      ship.setPosition({bowCoordinates: null, bowDirection: null});\n      state.ships.splice(state.ships.indexOf(ship));\n\n      let posRow = row;\n      let posCol = col;\n\n      for (let pos = 0; pos < ship.getLength(); pos += 1) {\n        state.board[posRow][posCol] = '';\n        const rowCol = helpers.calcNextRowCol(posRow, posCol, shipPosition.bowDirection);\n        posRow = rowCol.newRow;\n        posCol = rowCol.newCol;\n      }\n    },\n\n    allShipsPlaced: () => {\n      let allPlaced = true;\n      let neededShips = [];\n      let placedShips = [];\n\n      for (let key in battleship.ships) {\n        neededShips.push(battleship.ships[key].name)\n      }\n\n      for (let i = 0; i < state.ships.length; i += 1) {\n        placedShips.push(state.ships[i].getName());\n      }\n\n      for (let i = 0; i < neededShips.length && allPlaced; i += 1) {\n        allPlaced = placedShips.includes(neededShips[i]);\n      }\n\n      return allPlaced;\n    },\n\n    allShipsSunk: () => {\n      let sunk = [];\n\n      for (let i = 0; i < state.ships.length; i += 1) {\n        sunk.push(state.ships[i].isSunk());\n      }\n\n      return !sunk.includes(false);\n    },\n\n    getShip: (shipDesc) => {\n      let ship = null;\n\n      for (let i = 0; i < state.ships.length; i += 1) {\n        if (state.ships[i].getName() === shipDesc.name) {\n          ship = state.ships[i];\n          break;\n        }\n      }\n\n      return ship;\n    }\n  }),\n\n  boardHelpers: {\n    calcNextRowCol(row, col, bowDirection) {\n      let newRow = row;\n      let newCol = col;\n      switch (bowDirection) {\n        case 0:\n          newRow += 1;\n          break;\n        case 90:\n          newCol -= 1;\n          break;\n        case 180:\n          newRow -= 1;\n          break;\n        case 270:\n          newCol += 1;\n          break;\n      }\n      return {newRow: newRow, newCol: newCol};\n    },\n\n    placeShip(ship, shipPosition, state, helpers) {\n      const {row, col}  = helpers.getRowCol(shipPosition.bowCoordinates);\n\n      ship.setPosition(shipPosition);\n      state.ships.push(ship);\n\n      let posRow = row;\n      let posCol = col;\n\n      for (let pos = 0; pos < ship.getLength(); pos += 1) {\n        state.board[posRow][posCol] = ship\n        const rowCol = helpers.calcNextRowCol(posRow, posCol, shipPosition.bowDirection);\n        posRow = rowCol.newRow;\n        posCol = rowCol.newCol;\n      }\n    },\n\n    validCoordinates(coordinates) {\n      return /^[A-J][1-9]0?$/.test(coordinates);\n    },\n\n    validBowDirection(bowDirection) {\n      const directions = [0, 90, 180, 270];\n      return directions.includes(bowDirection);\n    },\n\n    validateShipPlacement(ship, shipPosition, state, helpers) {\n      const {row, col}  = helpers.getRowCol(shipPosition.bowCoordinates);\n\n      // Check if any part of ship is off board or overlaps another ship\n      let checkCol = col;\n      let checkRow = row;\n\n      for (let pos = 0; pos < ship.getLength(); pos += 1) {\n        if ((checkCol < 0) || (checkCol > 9) || (checkRow < 0) || (checkRow > 9)) {\n          throw('No part of ship can be placed off the board');\n        }\n        if (typeof(state.board[checkRow][checkCol]) === 'object') {\n          throw('No part of ship can overlap another ship');\n        }\n        const rowCol = helpers.calcNextRowCol(checkRow, checkCol, shipPosition.bowDirection);\n\n        checkRow = rowCol.newRow;\n        checkCol = rowCol.newCol;\n      }\n    },\n\n    validateShipPosition(shipPosition, helpers) {\n      if (!helpers.validCoordinates(shipPosition.bowCoordinates)) {\n        throw('Ship position is invalid');\n      }\n\n      if (!helpers.validBowDirection(shipPosition.bowDirection)) {\n        throw('Ship must have a direction of 0, 90, 180 or 270');\n      }\n    },\n\n    getRowCol(coordinates) {\n      const col = coordinates.charCodeAt(0) - 65;\n      const row = parseInt(coordinates.charAt(1), 10) - 1;\n      return {row: row, col: col};\n    },\n\n    getHullPosition(ship, bRow, bCol, helpers) {\n      const shipPostion = ship.getPosition();\n      const bowRowCol = helpers.getRowCol(shipPostion.bowCoordinates);\n      const bowDirection = shipPostion.bowDirection;\n\n      let position;\n\n      switch (bowDirection) {\n        case 0:\n          position = bRow - bowRowCol.row;\n          break;\n        case 90:\n          position = bowRowCol.col - bCol;\n          break;\n        case 180:\n          position = bowRowCol.row - bRow;\n          break;\n        case 270:\n          position = bCol - bowRowCol.col;\n          break;\n      }\n\n      return position;\n    },\n\n    alreadyAttacked(coordinates, state, helpers) {\n      const {row, col} = helpers.getRowCol(coordinates);\n      gridContent = state.board[row][col];\n\n      if (typeof(gridContent) === 'object') {\n        const hullPosition = helpers.getHullPosition( gridContent, row, col, helpers);\n        if (gridContent.isHit(hullPosition)) {\n          return true;\n        }\n      } else if (gridContent === battleship.MISS) {\n        return true;\n      }\n      return false;\n    },\n\n    markAttacked(coordinates, state, helpers) {\n      const {row, col} = helpers.getRowCol(coordinates);\n      gridContent = state.board[row][col];\n\n      if (typeof(gridContent) === 'object') {\n        const hullPosition = helpers.getHullPosition( gridContent, row, col, helpers);\n        gridContent.hit(hullPosition);\n        return battleship.HIT;\n      }\n      else {\n        state.board[row][col] = battleship.MISS;\n        return battleship.MISS;\n      }\n    },\n  },\n\n  createGameboard(player) {\n    const board = [[], [], [], [], [], [], [], [], [], []];\n\n    for (let row = 0; row < 10; row += 1) {\n      for (let col = 0; col < 10; col += 1) {\n        board[row][col] = '';\n      }\n    }\n\n    const state = {\n      player: player,\n      board: board,\n      ships: [],\n    };\n\n    return Object.assign({}, battleship.boardGetter(state), battleship.attackable(state, battleship.boardHelpers), battleship.tokenable(state, battleship.boardHelpers));\n  },\n\n  reportable: state => ({\n    getStatus: () => state.gameStatus,\n  }),\n\n  phaseable: (state, helpers)  => ({\n    finalizePlacement: () => {\n\n      if (state.phase !== 'setup') {\n        throw('An internal error occured');\n      }\n\n      const board1 = state.gameboards[0];\n      const board2 = state.gameboards[1];\n      const player1 = board1.getPlayerName();\n      const player2 = board2.getPlayerName();\n\n      if (board1.allShipsPlaced() && board2.allShipsPlaced()) {\n        state.gameStatus = `${player1}, your turn`;\n        state.activeGameboard = board2;\n        state.phase = 'playing';\n      } else if (board1.allShipsPlaced()) {\n        state.gameStatus = `${player2} is thinking...`;\n      } else if (board2.allShipsPlaced()) {\n        state.gameStatus = `${player1} is thinking...`;\n      }\n    },\n\n    attack: (coordinates) => {\n\n      if (state.phase !== 'playing') {\n        throw('An internal error occured');\n      }\n\n      const board1 = state.gameboards[0];\n      const board2 = state.gameboards[1];\n      const player1 = board1.getPlayerName();\n      const player2 = board2.getPlayerName();\n\n      const result = state.activeGameboard.receiveAttack(coordinates);\n\n      if (state.activeGameboard.allShipsSunk()) {\n        helpers.setGameOver(state, player1, player2, board1);\n      } \n      \n      if (state.phase !== 'over') {\n        helpers.setActiveGameboard(state, player1, player2, board1, board2);\n      }\n\n      return result;\n    },\n  }),\n\n  gcHelpers: {\n    setGameOver(state, player1, player2, board1) {\n      if (state.activeGameboard === board1) {\n        state.winner = player2;\n      } else {\n        state.winner = player1;\n      }\n      state.phase = 'over'\n      state.gameStatus = `${state.winner} is the winner`;\n    },\n\n    setActiveGameboard(state, player1 ,player2, board1, board2) {\n      if (state.activeGameboard === board2) {\n        state.gameStatus = `${player2} is thinking...`;\n        state.activeGameboard = board1;\n      } else {\n        state.gameStatus = `${player1}, your turn`;\n        state.activeGameboard = board2;\n      }\n    },\n  },\n\n  createGameController(board1, board2, displayController) {\n    const state = {\n      phase: 'setup',\n      activeGameboard: null,\n      gameboards: [board1, board2],\n      winner: null,\n      gameStatus: 'Place your ships',\n   };\n\n   return Object.assign({}, battleship.reportable(state), battleship.phaseable(state, battleship.gcHelpers));\n  },\n\n  setUpComputerBoard(gameboard) {\n    const setups = [battleship.computerSetup1, battleship.computerSetup2, battleship.computerSetup3];\n\n    const setup = setups[Math.floor(Math.random() * 3)]();\n\n    for (let i = 0; i < setup.length; i += 1) {\n      const aShip = battleship.createShip(setup[i].ship);\n      gameboard.placeShip(aShip, setup[i].position);\n    }\n  },\n\n  getComputerAttackCoordinates() {\n    const col = String.fromCharCode(65 + Math.floor(Math.random() * 10));\n    const row = Math.floor(Math.random() * 10) + 1;\n    return `${col}${row}`;\n  },\n\n};\n\nmodule.exports = battleship;\n\n\n//# sourceURL=webpack:///./src/battleship.js?");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

eval("const battleship = __webpack_require__(3);\n\nconst battleshipUI = {\n  interfaces: {\n    playerBoard: null,\n    gameController: null,\n  },\n\n  getShipCoordsName(ship) {\n    return `${ship}-bowpos`;\n  },\n\n  getShipDirectionName(ship) {\n    return `${ship}-bowdir`;\n  },\n\n  getShip(ship) {\n    switch (ship) {\n      case 'carrier':\n        return battleship.ships.carrier;\n        break;\n      case 'battleship':\n        return battleship.ships.battleship;\n        break;\n      case 'cruiser':\n        return battleship.ships.cruiser;\n        break;\n      case 'submarine':\n        return battleship.ships.submarine;\n        break;\n      case 'destroyer':\n        return battleship.ships.destroyer;\n        break;\n    }\n  },\n\n  getNextGridCoord(gridCoord, bowDirection) {\n    let colCharCode = gridCoord.charCodeAt(0);\n    let row = parseInt(gridCoord.substring(1,3));\n\n    switch (bowDirection) {\n      case 0:\n        row += 1;\n        break;\n      case 90:\n        colCharCode -= 1;\n        break;\n      case 180:\n        row -= 1;\n        break;\n      case 270:\n        colCharCode += 1;\n        break;\n    }\n\n    return `${String.fromCharCode(colCharCode)}${row}`\n\n\n  },\n\n  markSquares(shipObject) {\n    const shipPosition = shipObject.getPosition();\n    let markCoords = shipPosition.bowCoordinates;\n    const bowDirection = shipPosition.bowDirection;\n\n    for (let i = 0; i < shipObject.getLength(); i += 1) {\n      const cell = document.getElementById(markCoords);\n      cell.classList.add('gray');\n      markCoords = battleshipUI.getNextGridCoord(markCoords, bowDirection);\n    }\n  },\n\n  clearSquares(shipObject) {\n    const shipPosition = shipObject.getPosition();\n    let markCoords = shipPosition.bowCoordinates;\n    const bowDirection = shipPosition.bowDirection;\n\n    for (let i = 0; i < shipObject.getLength(); i += 1) {\n      const cell = document.getElementById(markCoords);\n      cell.classList.remove('gray');\n      markCoords = battleshipUI.getNextGridCoord(markCoords, bowDirection);\n    }\n  },\n\n  placeShip(ship, position) {\n    const shipObject = battleship.createShip(battleshipUI.getShip(ship), position);\n\n    try {\n      battleshipUI.interfaces.playerBoard.placeShip(shipObject, position);\n    } catch(e) {\n      alert(e);\n    }\n\n    battleshipUI.markSquares(shipObject);\n  },\n\n  getShipDesc(shipName) {\n    let shipDesc;\n\n    switch(shipName) {\n      case 'carrier':\n        shipDesc = battleship.ships.carrier;\n        break;\n      case 'battleship':\n        shipDesc = battleship.ships.battleship;\n        break;\n      case 'cruiser':\n        shipDesc = battleship.ships.cruiser;\n        break;\n      case 'submarine':\n        shipDesc = battleship.ships.submarine;\n        break;\n      case 'destroyer':\n        shipDesc = battleship.ships.destroyer;\n        break;\n    }\n\n    return shipDesc;\n  },\n\n  removeShip(shipName) {\n    const shipObject = battleshipUI.interfaces.playerBoard.getShip(battleshipUI.getShipDesc(shipName));\n\n    if (shipObject === null) {\n      alert(`${shipName} is not on the board`);\n    } else {\n      battleshipUI.clearSquares(shipObject);\n      battleshipUI.interfaces.playerBoard.removeShip(shipObject);\n    }\n  },\n\n  listeners: {\n    placeHandler(e) {\n      e.preventDefault();\n      const row = e.target.parentNode.parentNode;\n      const shipName = row.firstChild.textContent;\n      const bowCoordinates = row.querySelector(`input[name=${battleshipUI.getShipCoordsName(shipName)}`);\n      const bowDirection = parseInt(row.querySelector(`select[name=${battleshipUI.getShipDirectionName(shipName)}`).value, 10);\n\n      battleshipUI.placeShip(shipName, {bowCoordinates: bowCoordinates.value, bowDirection: bowDirection});\n    },\n\n    removeHandler(e) {\n      e.preventDefault();\n      const row = e.target.parentNode.parentNode;\n      const shipName = row.firstChild.textContent;\n\n      battleshipUI.removeShip(shipName);\n    },\n\n    finalizePlacementHandler(e) {\n      e.preventDefault();\n    },\n  },\n\n  getRootElement() {\n    return document.getElementById('root');\n  },\n\n  getGridCoordinates(row, col) {\n    const gridCol = String.fromCharCode(65 + (col - 1));\n\n    return `${gridCol}${row}`;\n  },\n\n  addGridCells(gridContainer) {\n    for (let row = 0; row < 11; row += 1) {\n      for (let col = 0; col < 11; col += 1) {\n        const cell = document.createElement('div');\n        if (row === 0 && col > 0) {\n          cell.textContent = String.fromCharCode(65 + (col - 1));\n          cell.classList.add('row-header');\n        }\n        if (col == 0 && row > 0) {\n          cell.textContent = row;\n          cell.classList.add('col-header');\n        }\n        if (row !== 0 && col !== 0) {\n          cell.id = battleshipUI.getGridCoordinates(row, col);\n          cell.classList.add('cell');\n        }\n        gridContainer.appendChild(cell);\n      }\n    }\n  },\n\n  createBattleshipGrid(id) {\n    const gridContainer = document.createElement('div');\n    gridContainer.id = id;\n    gridContainer.classList.add('container');\n    \n    battleshipUI.addGridCells(gridContainer);\n\n    return gridContainer;\n  },\n\n  createPlacementTableHeader() {\n    const headers = ['Ship', 'Bow Position', 'Bow Direction', 'Actions'];\n\n    const thead = document.createElement('thead');\n    const tr = document.createElement('tr');\n\n    for (let i = 0; i < headers.length; i += 1) {\n      const td = document.createElement('th');\n      td.textContent = headers[i];\n      tr.appendChild(td);\n    }\n\n    thead.appendChild(tr);\n    return thead;\n  },\n\n  createPositionInput(ship) {\n    const td = document.createElement('td');\n\n    const input = document.createElement('input');\n    input.setAttribute('type', 'text');\n    input.setAttribute('name', `${ship}-bowpos`);\n\n    td.appendChild(input);\n\n    return td;\n  },\n\n  createDirectionSelect(ship) {\n    const positions = ['0', '90', '180', '270'];\n    const td = document.createElement('td');\n    const select = document.createElement('select');\n    const options = document.createElement('options');\n    const name = `${ship}-bowdir`;\n\n    select.setAttribute('name', name);\n\n    for (let i = 0; i < positions.length; i += 1) {\n      const option = document.createElement('option');\n      option.textContent = positions[i];\n      select.appendChild(option);\n    }\n\n    td.appendChild(select);\n\n    return td;\n  },\n\n  createButton(content, callback) {\n    const button = document.createElement('button');\n    button.setAttribute('type', 'button');\n    button.textContent = content;\n    button.classList.add('btn');\n    button.addEventListener('click', callback);\n\n    return button;\n  },\n\n  createActionButtons() {\n    const td = document.createElement('td');\n\n    td.appendChild(battleshipUI.createButton('Place', battleshipUI.listeners.placeHandler));\n    td.appendChild(battleshipUI.createButton('Remove', battleshipUI.listeners.removeHandler));\n\n    return td;\n  },\n\n  addPlacementTableRows(ships, table) {\n    const tbody = document.createElement('tbody');\n\n    for (let i = 0; i < ships.length; i += 1) {\n      const tr = document.createElement('tr');\n      const td = document.createElement('td');\n\n      td.textContent = ships[i];\n      tr.appendChild(td);\n\n      tr.appendChild(battleshipUI.createPositionInput(ships[i]));\n      tr.appendChild(battleshipUI.createDirectionSelect(ships[i]));\n      tr.appendChild(battleshipUI.createActionButtons());\n\n      tbody.appendChild(tr);\n    }\n    table.appendChild(tbody);\n  },\n\n  createPlacementTable() {\n    const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];\n\n    const table = document.createElement('table');\n\n    table.appendChild(battleshipUI.createPlacementTableHeader());\n    battleshipUI.addPlacementTableRows(ships, table);\n\n    return table;\n  },\n\n  createPlacementContainer(placeCallback) {\n    const div = document.createElement('div');\n    div.id = 'placement';\n\n    div.appendChild(battleshipUI.createPlacementTable());\n    div.appendChild(battleshipUI.createButton('Finalize Placement', battleshipUI.listeners.finalizePlacementHandler));\n\n    return div;\n  },\n\n  createNoticeElement(id) {\n    const p = document.createElement('p');\n    p.id = id;\n    return p;\n  },\n\n  updatInfo(text) {\n    const infoElem = document.getElementById('info');\n\n    infoElem.textContent = text;\n  },\n  updateStatus(text) {\n    const statusElem = document.getElementById('status');\n\n    statusElem.textContent = text;\n  },\n\n  buildInitalPage() {\n    const rootElement = battleshipUI.getRootElement();\n\n    rootElement.appendChild(battleshipUI.createNoticeElement('status'));\n    rootElement.appendChild(battleshipUI.createBattleshipGrid('player-board'));\n    rootElement.appendChild(battleshipUI.createPlacementContainer(battleshipUI.listeners.placeHandler));\n\n    battleshipUI.updateStatus(battleshipUI.interfaces.gameController.getStatus());\n  },\n\n  init(playerBoard, gameController) {\n    battleshipUI.interfaces.playerBoard = playerBoard;\n    battleshipUI.interfaces.gameController = gameController;\n    battleshipUI.buildInitalPage();\n  },\n\n};\n\nmodule.exports = battleshipUI;\n\n\n//# sourceURL=webpack:///./src/battleshipUI.js?");

/***/ })
/******/ ]);
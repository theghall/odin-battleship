const battleship = require('./battleship');

const smallExplosion = require('./assets/graphics/explosion10x10.png');
const largeExplosion = require('./assets/graphics/explosion20x20.png');
const smallSplash = require('./assets/graphics/splash10x10.jpg');
const largeSplash = require('./assets/graphics/splash20x20.jpg');

const battleshipUI = {
  interfaces: {
    playerBoard: null,
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
    let row = parseInt(gridCoord.substring(1,3));

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

    return `${String.fromCharCode(colCharCode)}${row}`


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
    const shipObject = battleship.createShip(battleshipUI.getShip(ship), position);

    try {
      battleshipUI.interfaces.playerBoard.placeShip(shipObject, position);
    } catch(e) {
      alert(e);
    }

    battleshipUI.markSquares(shipObject);
  },

  getShipDesc(shipName) {
    let shipDesc;

    switch(shipName) {
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
    const shipObject = battleshipUI.interfaces.playerBoard.getShip(battleshipUI.getShipDesc(shipName));

    if (shipObject === null) {
      alert(`${shipName} is not on the board`);
    } else {
      battleshipUI.clearSquares(shipObject);
      battleshipUI.interfaces.playerBoard.removeShip(shipObject);
    }
  },

  removePlacement() {
    const placement = document.getElementById('placement');
    placement.parentNode.removeChild(placement);
  },

  minimizePlayerBoard() {
    const playerBoard = document.getElementById('player-board');
    playerBoard.classList.add('minimize');
  },

  addAttackGrid() {
    const rootElem = battleshipUI.getRootElement();
    const computerGrid = battleshipUI.createBattleshipGrid('computer-board');
    computerGrid.addEventListener('click', battleshipUI.listeners.attackHandler);
    rootElem.appendChild(computerGrid);
  },

  buildAttackScreen() {
    battleshipUI.removePlacement();
    battleshipUI.minimizePlayerBoard();
    battleshipUI.addAttackGrid();
  },

  setImage(cell, image) {
    cell.innerHTML = `<img src="${image}">`;
  },

  markPlayerResult(cell, result) {
    switch(result) {
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

    switch(result) {
      case battleship.HIT:
        battleshipUI.setImage(cell, smallExplosion);
        break;
      case battleship.MISS:
        battleshipUI.setImage(cell, smallSplash);
        break;
    }
  },

  doPlayerAttack(cell) {
    const playerResult = battleshipUI.interfaces.gameController.attack(cell.id);

    if (playerResult === battleship.HIT || playerResult === battleship.MISS) {
      battleshipUI.markPlayerResult(cell,playerResult);
      battleshipUI.updateStatus(battleshipUI.interfaces.gameController.getStatus());
    } else {
      alert('That square has already been attacked');
    }

    return playerResult;
  },

  doComputerAttack() {
    let attackCoordinates = null;
    let computerResult = null;

    while (computerResult !== battleship.HIT && computerResult !== battleship.MISS) {
      attackCoordinates = battleship.getComputerAttackCoordinates();
      try {
        computerResult = battleshipUI.interfaces.gameController.attack(attackCoordinates);
      } catch (e) {
        alert(e);
        break;
      }

      if (computerResult === battleship.INVALID) {
        alert(`An internal error occured. Computer tried to attack ${attackCoordinates}`);
        break;
      }
    }

    battleshipUI.markComputerResult(attackCoordinates, computerResult);

    battleshipUI.updateStatus(battleshipUI.interfaces.gameController.getStatus());
  },

  listeners: {
    placeHandler(e) {
      e.preventDefault();
      const row = e.target.parentNode.parentNode;
      const shipName = row.firstChild.textContent;
      const bowCoordinates = row.querySelector(`input[name=${battleshipUI.getShipCoordsName(shipName)}`);
      const bowDirection = parseInt(row.querySelector(`select[name=${battleshipUI.getShipDirectionName(shipName)}`).value, 10);

      battleshipUI.placeShip(shipName, {bowCoordinates: bowCoordinates.value, bowDirection: bowDirection});
    },

    removeHandler(e) {
      e.preventDefault();
      const row = e.target.parentNode.parentNode;
      const shipName = row.firstChild.textContent;

      battleshipUI.removeShip(shipName);
    },

    attackHandler(e) {
      e.preventDefault();
      const cell = (e.target.nodeName === 'IMG' ? e.target.parentNode : e.target);

      let gamePhase = battleshipUI.interfaces.gameController.getPhase();

      if (gamePhase !== 'over') {
        const result = battleshipUI.doPlayerAttack(cell);

        gamePhase = battleshipUI.interfaces.gameController.getPhase();

        if (result !== battleship.ATTACKED && gamePhase !== 'over') {
          battleshipUI.doComputerAttack();
        }
      }
    },

    finalizePlacementHandler(e) {
      e.preventDefault();

      battleshipUI.interfaces.gameController.finalizePlacement();
      battleshipUI.updateStatus(battleshipUI.interfaces.gameController.getStatus());
      battleshipUI.buildAttackScreen();
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
    gridContainer.classList.add('container');
    
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

  createButton(content, callback) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.textContent = content;
    button.classList.add('btn');
    button.addEventListener('click', callback);

    return button;
  },

  createActionButtons() {
    const td = document.createElement('td');

    td.appendChild(battleshipUI.createButton('Place', battleshipUI.listeners.placeHandler));
    td.appendChild(battleshipUI.createButton('Remove', battleshipUI.listeners.removeHandler));

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
    const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];

    const table = document.createElement('table');

    table.appendChild(battleshipUI.createPlacementTableHeader());
    battleshipUI.addPlacementTableRows(ships, table);

    return table;
  },

  createPlacementContainer(placeCallback) {
    const div = document.createElement('div');
    div.id = 'placement';

    div.appendChild(battleshipUI.createPlacementTable());
    div.appendChild(battleshipUI.createButton('Finalize Placement', battleshipUI.listeners.finalizePlacementHandler));

    return div;
  },

  createNoticeElement(id) {
    const p = document.createElement('p');
    p.id = id;
    return p;
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

    rootElement.appendChild(battleshipUI.createNoticeElement('status'));
    rootElement.appendChild(battleshipUI.createBattleshipGrid('player-board'));
    rootElement.appendChild(battleshipUI.createPlacementContainer(battleshipUI.listeners.placeHandler));

    battleshipUI.updateStatus(battleshipUI.interfaces.gameController.getStatus());
  },

  init(playerBoard, gameController) {
    battleshipUI.interfaces.playerBoard = playerBoard;
    battleshipUI.interfaces.gameController = gameController;
    battleshipUI.buildInitalPage();
  },

};

module.exports = battleshipUI;

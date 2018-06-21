const battleship = require('./battleship');

const smallExplosion = require('./assets/graphics/explosion10x10.png');
const largeExplosion = require('./assets/graphics/explosion20x20.png');
const smallSplash = require('./assets/graphics/splash10x10.jpg');
const largeSplash = require('./assets/graphics/splash20x20.jpg');

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

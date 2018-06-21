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

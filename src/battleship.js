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

  getter: state => ({
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
      { return state.hull[pos] === true; }
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
      battleship.getter(state),
      battleship.sinkable(state),
      battleship.positionable(state)
    );
  },

  attackable: (state, helpers) => ({
    receiveAttack: (coordinates) => {
      if (!helpers.validCoordinates(coordinates)) {
        return(battleship.INVALID);
      }

      if (!helpers.alreadyAttacked(coordinates, state, helpers)) {
        return helpers.markAttacked(coordinates, state, helpers);
      } else {
        return battleship.ATTACKED;
     }
   }
  }),

  tokenable: (state, helpers) => ({
    placeShip: (ship, shipPosition) => {
      helpers.validateShipPosition(shipPosition, helpers);

      helpers.validateShipPlacement(ship, shipPosition, state, helpers);

      helpers.placeShip(ship, shipPosition, state, helpers);
    },

    allShipsPlaced: () => {
      let allPlaced = true;
      let neededShips = [];
      let placedShips = [];

      for (let key in battleship.ships) {
        neededShips.push(battleship.ships[key].name)
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
      return {newRow: newRow, newCol: newCol};
    },

    placeShip(ship, shipPosition, state, helpers) {
      const {row, col}  = helpers.getRowCol(shipPosition.bowCoordinates);

      ship.setPosition(shipPosition);
      state.ships.push(ship);

      let posRow = row;
      let posCol = col;

      for (let pos = 0; pos < ship.getLength(); pos += 1) {
        state.board[posRow][posCol] = ship
        const rowCol = helpers.calcNextRowCol(posRow, posCol, shipPosition.bowDirection);
        posRow = rowCol.newRow;
        posCol = rowCol.newCol;
      }
    },

    validCoordinates(coordinates) {
      return /^[A-J][1-8]$/.test(coordinates);
    },

    validBowDirection(bowDirection) {
      const directions = [0, 90, 180, 270];
      return directions.includes(bowDirection);
    },

    validateShipPlacement(ship, shipPosition, state, helpers) {
      const {row, col}  = helpers.getRowCol(shipPosition.bowCoordinates);

      // Check if any part of ship is off board or overlaps another ship
      let checkCol = col;
      let checkRow = row;

      for (let pos = 0; pos < ship.getLength(); pos += 1) {
        if ((checkCol < 0) || (checkCol > 7) || (checkRow < 0) || (checkRow > 7)) {
          throw('No part of ship can be placed off the board');
        }
        if (typeof(state.board[checkRow][checkCol]) === 'object') {
          throw('No part of ship can overlap another ship');
        }
        const rowCol = helpers.calcNextRowCol(checkRow, checkCol, shipPosition.bowDirection);

        checkRow = rowCol.newRow;
        checkCol = rowCol.newCol;
      }
    },

    validateShipPosition(shipPosition, helpers) {
      if (!helpers.validCoordinates(shipPosition.bowCoordinates)) {
        throw('Ship position is invalid');
      }

      if (!helpers.validBowDirection(shipPosition.bowDirection)) {
        throw('Ship must have a direction of 0, 90, 180 or 270');
      }
    },

    getRowCol(coordinates) {
      const col = coordinates.charCodeAt(0) - 65;
      const row = parseInt(coordinates.charAt(1), 10) - 1;
      return {row: row, col: col};
    },

    getHullPosition(ship, bRow, bCol) {
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
      const {row, col} = helpers.getRowCol(coordinates);
      gridContent = state.board[row][col];

      if (typeof(gridContent) === 'object') {
        const hullPosition = helpers.getHullPosition( gridContent, row, col);
        if (gridContent.isHit(hullPosition)) {
          return true;
        }
      } else if (gridContent === battleship.MISS) {
        return true;
      }
      return false;
    },

    markAttacked(coordinates, state, helpers) {
      const {row, col} = helpers.getRowCol(coordinates);
      gridContent = state.board[row][col];

      if (typeof(gridContent) === 'object') {
        const hullPosition = helpers.getHullPosition( gridContent, row, col);
        gridContent.hit(hullPosition);
        return battleship.HIT;
      }
      else {
        state.board[row][col] = battleship.MISS;
        return battleship.MISS;
      }
    },
  },

  createGameboard(player) {
    const board = [[], [], [], [], [], [], [], []];

    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        board[row][col] = '';
      }
    }

    const state = {
      player: player,
      board: board,
      ships: [],
    };

    return Object.assign({}, battleship.attackable(state, battleship.boardHelpers), battleship.tokenable(state, battleship.boardHelpers));
  },
};

module.exports = battleship;

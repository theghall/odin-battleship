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

  attackable: (state, funcs) => ({
    recieveAttack: (coordinates) => {
      let hullPosition;

      if (!funcs.validCoordinates(coordinates)) {
        return(battleship.INVALID);
      }
      
      const {row, col} = funcs.getRowCol(coordinates);

      if (state.board[row][col] === '' ) {
        state.board[row][col] = battleship.MISS;
        return battleship.MISS;
      } else if (state.board[row][col] !== '') {
        if (state.board[row][col] === 'object') {
          ship = state.board[row][col];
          hullPosition = funcs.getHullPosition(ship, row, col);
          if (isHit(hullPosition)) {
            return battleship.ATTACKED;
          } else {
            ship.hit(hullPosition);
            return battleship.HIT;  
          }
        } else if (state.board[row][col] === battleship.MISS) {
            return battleship.ATTACKED;
        }
      }
   }
  }),

  tokenable: (state, funcs) => ({
    placeShip: (ship, shipPosition) => {
      if (!funcs.validCoordinates(shipPosition.bowCoordinates)) {
        throw('Ship position is invalid');
      }

      if (!funcs.validBowDirection(shipPosition.bowDirection)) {
        throw('Ship must have a direction of 0, 90, 180 or 270');
      }

      const x = funcs.getRowCol(shipPosition.bowCoordinates);
      const row = x.row;
      const col = x.col;

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
        switch (shipPosition.bowDirection) {
          case 0:
            checkRow += 1;
            break;
          case 90:
            checkCol -= 1;
            break;
          case 180:
            checkRow -= 1;
            break;
          case 270:
            checkCol += 1;
            break;
        }
      }
      // Ship can be placed on board
      ship.setPosition(shipPosition);
      state.ships.push(ship);
      let posRow = row;
      let posCol = col;
      for (let pos = 0; pos < ship.getLength(); pos += 1) {
        state.board[posRow][posCol] = ship
        switch (shipPosition.bowDirection) {
          case 0:
            posRow += 1;
            break;
          case 90:
            posCol -= 1;
            break;
          case 180:
            posRow -= 1;
            break;
          case 270:
            posCol += 1;
            break;
        }
      }
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
    validCoordinates(coordinates) {
      return /^[A-J][1-8]$/.test(coordinates);
    },
    validBowDirection(bowDirection) {
      const directions = [0, 90, 180, 270];
    return directions.includes(bowDirection);
    },
    getRowCol(coordinates) {
      const col = coordinates.charCodeAt(0) - 65;
      const row = parseInt(coordinates.charAt(1), 10) - 1;
      return {row: row, col: col};
    },
    getHullPosition(ship, bRow, bCol) {
      const shipPostion = ship.getPosition();
      const bowRowCol = boardHelpers.getRowCol(shipPostion.bowCoordinates);
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
    }
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

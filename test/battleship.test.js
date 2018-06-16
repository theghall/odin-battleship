const battleship = require('../src/battleship');

describe('Testing ships...', () => {
  test('it should create a ship with the correct name', () => {
    const aBattleship = battleship.createShip(battleship.ships.battleship);

    expect(aBattleship.getName()).toMatch(battleship.ships.battleship.name);
  });

  test('it should create a ship with the correct hull length', () => {
    const aBattleship = battleship.createShip(battleship.ships.battleship);

    expect(aBattleship.getLength()).toBe(battleship.ships.battleship.hull);
  });

  test('it should create a ship with null positional data', () => {
    const aBattleship = battleship.createShip(battleship.ships.battleship);

    const position = aBattleship.getPosition();

    expect(position.bowCoordinates).toBeNull;
    expect(position.bowDirection).toBeNull;
  });

  test("it should set a ship's position correctly", () => {
    const aBattleship = battleship.createShip(battleship.ships.battleship);
    const bowCoordinates = 'A8';
    const bowDirection = 90;

    aBattleship.setPosition({
      bowCoordinates: bowCoordinates,
      bowDirection: bowDirection,
    });

    const position = aBattleship.getPosition();

    expect(position.bowCoordinates).toMatch(bowCoordinates);
    expect(position.bowDirection).toBe(bowDirection);
  });

test('it should report a ship with no hits as not sunk', () => {
    const aBattleship = battleship.createShip(battleship.ships.battleship);

    expect(aBattleship.isSunk()).toBeFalsy;
  });


  test('it should report correct position hit', () => {
    const aBattleship = battleship.createShip(battleship.ships.battleship);

    aBattleship.hit(1);

    expect(aBattleship.isHit(0)).toBeDefined();
    expect(aBattleship.isHit(1)).toBeDefined();
    expect(aBattleship.isHit(0)).toBeFalsy();
    expect(aBattleship.isHit(1)).toBeTruthy();
    expect(aBattleship.isHit(2)).toBeFalsy();
    expect(aBattleship.isHit(3)).toBeFalsy();
  });

  test('it should report a ship with one remaining hull position as not sunk', () => {
    const aBattleship = battleship.createShip(battleship.ships.battleship);

    for (let i = 0; i < aBattleship.length - 1; i += 1) {
      aBattleship.hit(i);
    }

    expect(aBattleship.isSunk()).toBeFalsy;
  });

  test('it should report a ship with all hull positions hit as sunk', () => {
    const aBattleship = battleship.createShip(battleship.ships.battleship);

    for (let i = 0; i < aBattleship.length; i += 1) {
      aBattleship.hit(i);
    }

    expect(aBattleship.isSunk()).toBeTruthy;
  });
});

describe('Testing gameboard...', () => {

  test('it should return correct player name for a board', () => {
    const gameboard = battleship.createGameboard('Jack');

    expect(gameboard.getPlayerName()).toMatch('Jack');
  });

  test('it should record a a miss on an attack', () => {
    const gameboard = battleship.createGameboard('Jack');

    expect(gameboard.receiveAttack('A8')).toBe(battleship.MISS);
  });

  test('it should reject an invalid coordinate for an attack', () => {
    const gameboard = battleship.createGameboard('Jack');

    expect(gameboard.receiveAttack('A8')).not.toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('A9')).not.toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('A10')).not.toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('A')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('8')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('a7')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('K7')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('A0')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('A11')).toBe(battleship.INVALID);
   });

  test('it should return a coordinate already attacked as attacked', () => {
    const gameboard = battleship.createGameboard('Jack');
    const cooordinates = 'A7';

    gameboard.receiveAttack(cooordinates);
    expect(gameboard.receiveAttack(cooordinates)).toBe(battleship.ATTACKED);
  });

  test('it should not allow invalid ship position when being placed', () => {
    const gameboard = battleship.createGameboard('Jack');
    const aCarrier = battleship.createShip(battleship.ships.carrier);

    expect(() => gameboard.placeShip(aCarrier, {bowCoordinates: 'J9', bowDirection: 0})).toThrow();
    expect(() => gameboard.placeShip(aCarrier, {bowCoordinates: 'A1', bowDirection: 120})).toThrow();
  });


  test('it should not allow any part of a ship to be off the gameboard', () => {
    const gameboard = battleship.createGameboard('Jack');
    const aCarrier = battleship.createShip(battleship.ships.carrier);

    expect(() => gameboard.placeShip(aCarrier, {bowCoordinates: 'A1', bowDirection: 0})).not.toThrow();
    expect(() => gameboard.placeShip(aCarrier, {bowCoordinates: 'F6', bowDirection: 0})).not.toThrow();
    expect(() => gameboard.placeShip(aCarrier, {bowCoordinates: 'A1', bowDirection: 180})).toThrow();
    expect(() => gameboard.placeShip(aCarrier, {bowCoordinates: 'A4', bowDirection: 180})).toThrow();
    expect(() => gameboard.placeShip(aCarrier, {bowCoordinates: 'F1', bowDirection: 270})).not.toThrow();
    expect(() => gameboard.placeShip(aCarrier, {bowCoordinates: 'G1', bowDirection: 270})).toThrow();
  });

  test('it should not allow ships to overlap', () => {
    const gameboard = battleship.createGameboard('Jack');
    const aCarrier = battleship.createShip(battleship.ships.carrier);
    const aDestroyer = battleship.createShip(battleship.ships.destroyer);

    gameboard.placeShip(aCarrier, {bowCoordinates: 'B1', bowDirection: 0});
    expect(() => gameboard.placeShip(aDestroyer, {bowCoordinates: 'C1', bowDirection: 0})).not.toThrow();
    expect(() => gameboard.placeShip(aDestroyer, {bowCoordinates: 'B1', bowDirection: 0})).toThrow();
    expect(() => gameboard.placeShip(aDestroyer, {bowCoordinates: 'B1', bowDirection: 90})).toThrow();
    expect(() => gameboard.placeShip(aDestroyer, {bowCoordinates: 'B5', bowDirection: 0})).toThrow();
    expect(() => gameboard.placeShip(aDestroyer, {bowCoordinates: 'C1', bowDirection: 90})).toThrow();

  });

  test('it should report a hit on an attack', () => {
    const gameboard = battleship.createGameboard('Jack');
    const aCarrier = battleship.createShip(battleship.ships.carrier);

    gameboard.placeShip(aCarrier, {bowCoordinates: 'B1', bowDirection: 0});

    expect(gameboard.receiveAttack('B1')).toBe(battleship.HIT);
  });

  test('it should report all ships placed', () => {
    const aCarrier = battleship.createShip(battleship.ships.carrier);
    const aBattleship = battleship.createShip(battleship.ships.battleship);
    const aCruiser = battleship.createShip(battleship.ships.cruiser);
    const aSubmarine = battleship.createShip(battleship.ships.submarine);
    const aDestroyer = battleship.createShip(battleship.ships.destroyer);
    
    const gameboard = battleship.createGameboard('Jack');

    gameboard.placeShip(aCarrier, {bowCoordinates: 'A1', bowDirection: 0});
    expect(gameboard.allShipsPlaced()).toBeDefined();
    expect(gameboard.allShipsPlaced()).toBeFalsy();
    gameboard.placeShip(aBattleship, {bowCoordinates: 'B1', bowDirection: 0});
    expect(gameboard.allShipsPlaced()).toBeFalsy();
    gameboard.placeShip(aCruiser, {bowCoordinates: 'C1', bowDirection: 0});
    expect(gameboard.allShipsPlaced()).toBeFalsy();
    gameboard.placeShip(aSubmarine, {bowCoordinates: 'D1', bowDirection: 0});
    expect(gameboard.allShipsPlaced()).toBeFalsy();
    gameboard.placeShip(aDestroyer, {bowCoordinates: 'E1', bowDirection: 0});

    expect(gameboard.allShipsPlaced()).toBeTruthy();
  });

  test('it should report all ships sunk', () => {
    const aCarrier = battleship.createShip(battleship.ships.carrier);
    const aBattleship = battleship.createShip(battleship.ships.battleship);
    const aCruiser = battleship.createShip(battleship.ships.cruiser);
    const aSubmarine = battleship.createShip(battleship.ships.submarine);
    const aDestroyer = battleship.createShip(battleship.ships.destroyer);

    const ships = [aCarrier, aBattleship, aCruiser, aSubmarine, aDestroyer];
    const positions = [
      {bowCoordinates: 'A1', bowDirection: 0},
      {bowCoordinates: 'B1', bowDirection: 0},
      {bowCoordinates: 'C1', bowDirection: 0},
      {bowCoordinates: 'D1', bowDirection: 0},
      {bowCoordinates: 'E1', bowDirection: 0},
    ];

    const gameboard = battleship.createGameboard('Jack');

    for (let i = 0; i < ships.length; i += 1) {
      gameboard.placeShip(ships[i], positions[i]);
    }

    expect(gameboard.allShipsSunk()).toBeDefined();
    expect(gameboard.allShipsSunk()).toBeFalsy();

    for (let i = 0; i < ships.length; i += 1) {
      let aShip = ships[i];
      expect(gameboard.allShipsSunk()).toBeFalsy();
      for (let j = 0; j < aShip.getLength(); j += 1) {
        aShip.hit(j);
      }
    }
    expect(gameboard.allShipsSunk()).toBeTruthy();
  });

  test('it should sink a ship with bow position of 0', () => {
    const aCruiser = battleship.createShip(battleship.ships.cruiser);
    const gameboard = battleship.createGameboard('Jack');
    gameboard.placeShip(aCruiser, {bowCoordinates: 'A1', bowDirection: 0});

    for (let j = 0; j < aCruiser.getLength(); j += 1) {
      aCruiser.hit(j);
    }

    expect(aCruiser.isSunk()).toBeTruthy();
  });

  test('it should sink a ship with bow position of 90', () => {
    const aCruiser = battleship.createShip(battleship.ships.cruiser);
    const gameboard = battleship.createGameboard('Jack');
    gameboard.placeShip(aCruiser, {bowCoordinates: 'C1', bowDirection: 90});

    for (let j = 0; j < aCruiser.getLength(); j += 1) {
      aCruiser.hit(j);
    }

    expect(aCruiser.isSunk()).toBeTruthy();
  });

  test('it should sink a ship with bow position of 180', () => {
    const aCruiser = battleship.createShip(battleship.ships.cruiser);
    const gameboard = battleship.createGameboard('Jack');
    gameboard.placeShip(aCruiser, {bowCoordinates: 'C4', bowDirection: 180});

    for (let j = 0; j < aCruiser.getLength(); j += 1) {
      aCruiser.hit(j);
    }

    expect(aCruiser.isSunk()).toBeTruthy();
  });

  test('it should sink a ship with bow position of 270', () => {
    const aCruiser = battleship.createShip(battleship.ships.cruiser);
    const gameboard = battleship.createGameboard('Jack');
    gameboard.placeShip(aCruiser, {bowCoordinates: 'C4', bowDirection: 270});

    for (let j = 0; j < aCruiser.getLength(); j += 1) {
      aCruiser.hit(j);
    }

    expect(aCruiser.isSunk()).toBeTruthy();
  });

});

describe('Testing gameController...', () => {
  
  test('it should report the correct initial status', () => {
    const gameboard1 = battleship.createGameboard('Player1');
    const gameboard2 = battleship.createGameboard('Computer');
    const gameController = battleship.createGameController(gameboard1, gameboard2, null);

    expect(gameController.getStatus()).toMatch('Place your ships');
  });

  test('it should report correct status if player1 finalizes first', () => {
    const player1 = 'Player1';
    const player2 = 'Computer';

    const allShipsPlacedTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsPlacedFalse = jest.fn().mockImplementation(function() { return false; });

    const gameboard1 = battleship.createGameboard(player1);
    const gameboard2 = battleship.createGameboard(player2);
    const gameController = battleship.createGameController(gameboard1, gameboard2, null);

    gameboard1.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameboard2.allShipsPlaced = allShipsPlacedFalse.bind(gameboard1);
    gameController.finalizePlacement();
    expect(gameController.getStatus()).toMatch(`${player2} is thinking...`);
    gameboard2.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameController.finalizePlacement();
    expect(gameController.getStatus()).toMatch(`${player1}, your turn`);

  });

  test('it should report correct status if player2 finalizes first', () => {
    const player1 = 'Player1';
    const player2 = 'Computer';

    const allShipsPlacedTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsPlacedFalse = jest.fn().mockImplementation(function() { return false; });

    const gameboard1 = battleship.createGameboard(player1);
    const gameboard2 = battleship.createGameboard(player2);
    const gameController = battleship.createGameController(gameboard1, gameboard2, null);

    gameboard1.allShipsPlaced = allShipsPlacedFalse.bind(gameboard1);
    gameboard2.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameController.finalizePlacement();
    expect(gameController.getStatus()).toMatch(`${player1} is thinking...`);
    gameboard1.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameController.finalizePlacement();
    expect(gameController.getStatus()).toMatch(`${player1}, your turn`);
  });

  test('it should report the correct status after a player attacks', () => {
    const player1 = 'Player1';
    const player2 = 'Computer';

    const allShipsPlacedTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkFalse = jest.fn().mockImplementation(function() { return false; });

    const gameboard1 = battleship.createGameboard(player1);
    const gameboard2 = battleship.createGameboard(player2);
    const gameController = battleship.createGameController(gameboard1, gameboard2, null);

    // Get game state to correct state
    gameboard1.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameboard2.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameController.finalizePlacement();

    gameboard1.allShipsSunk = allShipsSunkFalse.bind(gameboard1);
    gameboard2.allShipsSunk = allShipsSunkFalse.bind(gameboard2);
    gameController.attack('A1');
    expect(gameController.getStatus()).toMatch(`${player2} is thinking...`);
    gameController.attack('A1');
    expect(gameController.getStatus()).toMatch(`${player1}, your turn`);
  });

  test('it should return the correct result of the attack', () => {
    const player1 = 'Player1';
    const player2 = 'Computer';

    const allShipsPlacedTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkFalse = jest.fn().mockImplementation(function() { return false; });

    const gameboard1 = battleship.createGameboard(player1);
    const gameboard2 = battleship.createGameboard(player2);

    const aDestroyer = battleship.createShip(battleship.ships.destroyer);
    gameboard2.placeShip(aDestroyer, {bowCoordinates: 'A1', bowDirection: 0});

    const gameController = battleship.createGameController(gameboard1, gameboard2, null);

    // Get game state to correct state
    gameboard1.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameboard2.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameController.finalizePlacement();

    gameboard1.allShipsSunk = allShipsSunkFalse.bind(gameboard1);
    gameboard2.allShipsSunk = allShipsSunkFalse.bind(gameboard2);
    expect(gameController.attack('A1')).toBe(battleship.HIT);
    // Switch players
    gameController.attack('B1'); 
    expect(gameController.attack('A1')).toBe(battleship.ATTACKED);
    // Switch players
    gameController.attack('B2');
    expect(gameController.attack('B1')).toBe(battleship.MISS);
    // Switch players
    gameController.attack('B3');
    expect(gameController.attack('B11')).toBe(battleship.INVALID);
  });
  
  it('should report player1 as the winner', () => {
    const player1 = 'Player1';
    const player2 = 'Computer';

    const allShipsPlacedTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkFalse = jest.fn().mockImplementation(function() { return false; });

    const gameboard1 = battleship.createGameboard(player1);
    const gameboard2 = battleship.createGameboard(player2);
    const gameController = battleship.createGameController(gameboard1, gameboard2, null);

    // Get game state to correct state
    gameboard1.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameboard2.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameController.finalizePlacement();

    gameboard2.allShipsSunk = allShipsSunkTrue.bind(gameboard2);
    gameController.attack('A1');
    expect(gameController.getStatus()).toMatch(`${player1} is the winner`);
  });

  it('should report player2 as the winner', () => {
    const player1 = 'Player1';
    const player2 = 'Computer';

    const allShipsPlacedTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkFalse = jest.fn().mockImplementation(function() { return false; });

    const gameboard1 = battleship.createGameboard(player1);
    const gameboard2 = battleship.createGameboard(player2);
    const gameController = battleship.createGameController(gameboard1, gameboard2, null);

    // Get game state to correct state
    gameboard1.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameboard2.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameController.finalizePlacement();

    gameboard2.allShipsSunk = allShipsSunkFalse.bind(gameboard2);
    gameController.attack('A1');
    gameboard1.allShipsSunk = allShipsSunkTrue.bind(gameboard1);
    gameController.attack('A1');
    expect(gameController.getStatus()).toMatch(`${player2} is the winner`);
  });

  it('should throw an error if finalizePlacement called during game play', () => {
    const player1 = 'Player1';
    const player2 = 'Computer';

    const allShipsPlacedTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkFalse = jest.fn().mockImplementation(function() { return false; });

    const gameboard1 = battleship.createGameboard(player1);
    const gameboard2 = battleship.createGameboard(player2);
    const gameController = battleship.createGameController(gameboard1, gameboard2, null);

    // Get game state to correct state
    gameboard1.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameboard2.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    expect(() => gameController.finalizePlacement()).not.toThrow();
    expect(() => gameController.finalizePlacement()).toThrow('An internal error occured');
  });

  test('it should throw an error if attack called during setup', () => {
    const player1 = 'Player1';
    const player2 = 'Computer';

    const allShipsPlacedTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkFalse = jest.fn().mockImplementation(function() { return false; });

    const gameboard1 = battleship.createGameboard(player1);
    const gameboard2 = battleship.createGameboard(player2);
    const gameController = battleship.createGameController(gameboard1, gameboard2, null);

    expect(() => gameController.attack('A1')).toThrow('An internal error occured');
  });

  test('it should throw an error if finalizePlacement or attack called when game is over', () => {
    const player1 = 'Player1';
    const player2 = 'Computer';

    const allShipsPlacedTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkTrue = jest.fn().mockImplementation(function() { return true; });
    const allShipsSunkFalse = jest.fn().mockImplementation(function() { return false; });

    const gameboard1 = battleship.createGameboard(player1);
    const gameboard2 = battleship.createGameboard(player2);
    const gameController = battleship.createGameController(gameboard1, gameboard2, null);

    // Get game state to correct state
    gameboard1.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameboard2.allShipsPlaced = allShipsPlacedTrue.bind(gameboard1);
    gameController.finalizePlacement();

    gameboard2.allShipsSunk = allShipsSunkFalse.bind(gameboard2);
    gameController.attack('A1');
    gameboard1.allShipsSunk = allShipsSunkTrue.bind(gameboard1);
    gameController.attack('A1');
    expect(gameController.getStatus()).toMatch(`${player2} is the winner`);
    expect(() => gameController.finalizePlacement()).toThrow('An internal error occured');
    expect(() => gameController.attack()).toThrow('An internal error occured');
  });

});
  describe('Testing computer player', () => {

    test('it should report all ships placed for setup1', () => {
      const player1 = 'Player1';
      const player2 = 'Computer';

      const gameboard1 = battleship.createGameboard(player1);
      const gameboard2 = battleship.createGameboard(player2);
      const gameController = battleship.createGameController(gameboard1, gameboard2, null);

      Math.floor = jest.fn().mockImplementation(function() { return 0; });
      
      battleship.setUpComputerBoard(gameboard2);
      expect(gameboard2.allShipsPlaced()).toBeTruthy();
    });

    test('it should report all ships placed for setup2', () => {
      const player1 = 'Player1';
      const player2 = 'Computer';

      const gameboard1 = battleship.createGameboard(player1);
      const gameboard2 = battleship.createGameboard(player2);
      const gameController = battleship.createGameController(gameboard1, gameboard2, null);

      Math.floor = jest.fn().mockImplementation(function() { return 1; });
      
      battleship.setUpComputerBoard(gameboard2);
      expect(gameboard2.allShipsPlaced()).toBeTruthy();
    });

    test('it should report all ships placed for setup3', () => {
      const player1 = 'Player1';
      const player2 = 'Computer';

      const gameboard1 = battleship.createGameboard(player1);
      const gameboard2 = battleship.createGameboard(player2);
      const gameController = battleship.createGameController(gameboard1, gameboard2, null);

      Math.floor = jest.fn().mockImplementation(function() { return 2; });
      
      battleship.setUpComputerBoard(gameboard2);
      expect(gameboard2.allShipsPlaced()).toBeTruthy();
    });

    test('it should generate valid attack coordinates', () => {
      for (let i = 0; i < 10000; i += 1) {
        expect(battleship.getComputerAttackCoordinates()).toMatch(/^[A-J][1-9]0?$/);
      }
    });
 });

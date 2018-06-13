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

  test('it should record a a miss on an attack', () => {
    const gameboard = battleship.createGameboard('Jack');

    expect(gameboard.receiveAttack('A8')).toBe(battleship.MISS);
  });

  test('it should reject an invalid coordinate for an attack', () => {
    const gameboard = battleship.createGameboard('Jack');

    expect(gameboard.receiveAttack('')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('A')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('8')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('a7')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('K7')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('A0')).toBe(battleship.INVALID);
    expect(gameboard.receiveAttack('A9')).toBe(battleship.INVALID);
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
    expect(() => gameboard.placeShip(aCarrier, {bowCoordinates: 'A1', bowDirection: 180})).toThrow();
    expect(() => gameboard.placeShip(aCarrier, {bowCoordinates: 'A4', bowDirection: 180})).toThrow();
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
});

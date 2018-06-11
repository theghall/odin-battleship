const battleship = require('../src/battleship');

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

test('it should set a ship\'s position correctly', () => {
  const aBattleship = battleship.createShip(battleship.ships.battleship);
  const bowCoordinates = 'A8';
  const bowDirection = 90;

  aBattleship.setPosition({bowCoordinates: bowCoordinates, bowDirection: bowDirection});

  const position = aBattleship.getPosition();

  expect(position.bowCoordinates).toMatch(bowCoordinates);
  expect(position.bowDirection).toBe(bowDirection);
});

test('it should report a ship with no hits as not sunk', () => {
  const aBattleship = battleship.createShip(battleship.ships.battleship);

  expect(aBattleship.isSunk()).toBeFalsy;
});


test('it should report a ship with one remaining hull position as not sunk', () => {
  const aBattleship = battleship.createShip(battleship.ships.battleship);

  for (let i = 0; i < aBattleship.length - 1; i += 1) {
    aBattleship.hit();
  }

  expect(aBattleship.isSunk()).toBeFalsy;
});


test('it should report a ship with all hull positions hit as sunk', () => {
  const aBattleship = battleship.createShip(battleship.ships.battleship);

  for (let i = 0; i < aBattleship.length; i += 1) {
    aBattleship.hit();
  }

  expect(aBattleship.isSunk()).toBeTruthy;
});



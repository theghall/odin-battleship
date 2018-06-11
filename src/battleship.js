const battleship = {
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
};

module.exports = battleship;

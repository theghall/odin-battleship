const battleship = {
  hulls: {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
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
  createShip(shipName, hullLength) {
    const hull = [];
    // Mark each hull position as not hit
    for (let i = 0; i < hullLength; i += 1) {
      hull.push(false);
    }
    const state = {
      name: shipName,
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

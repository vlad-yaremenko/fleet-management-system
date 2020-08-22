const cote = require('cote');

const inspector = new cote.Requester({ name: 'inspector', key: 'inspector' })

module.exports = {
  pushCarState(body) {
    inspector.send({ type: 'car-state', body });
  }
};

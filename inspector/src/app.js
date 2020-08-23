const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cote = require('cote');

require('./db');

const Penalty = require('./db/models/Penalty');

const inspector = new cote.Responder({ name: 'inspector', key: 'inspector' })
inspector.on('car-state', async req => {
  const driver = await fetch(`http://fleet:3000/api/car/${req.body.carId}/driver`).then(async (res) => {
    return await res.json();
  });

  if (req.body.speed > 60) {
    Penalty.create({
      points: req.body.speed > 80 ? 5 : 2,
      reason: `Speed ${req.body.speed} at [${req.body.coordinates}]`,
      driverId: driver._id,
      carId: driver._car
    }).then(console.log);
  }
})

module.exports = app;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cote = require('cote');
const Penalty = require('./db/models/Penalty');

app.use(bodyParser.json());

const inspector = new cote.Responder({ name: 'inspector', key: 'inspector' })
inspector.on('car-state', async req => {
  const driver = await fetch(`http://fleet:3000/api/car/${req.body.carId}/driver`).then(async (res) => {
    return await res.json();
  });

  if (req.body.speed > 60) {
    const points = req.body.speed > 80 ? 5 : 2;

    Penalty.create({
      points,
      reason: `Speed limit violated ${points > 2 ? 80 : 60} at [${req.body.coordinates}]`,
      driverId: driver._id,
      carId: driver._car
    });
  }
})

module.exports = app;

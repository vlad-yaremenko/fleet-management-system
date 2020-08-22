const fetch = require("node-fetch");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const inspectorPusher = require('./core/inspector-pusher');

// TODO: For each driver with trip and car generate push car state data by trip path
setTimeout(async () => {
  let drivers;
  let cars;
  let trips;

  await Promise.all([
    fetch('http://fleet:3000/api/driver').then(async (res) => {
      drivers = await res.json();
    }),
    fetch('http://fleet:3000/api/trip').then(async (res) => {
      trips = await res.json();
    }),
    fetch('http://fleet:3000/api/car').then(async (res) => {
      cars = await res.json();
    })
  ]);

  await Promise.all(drivers.map(async (driver, index) => {
    return (await fetch(`http://fleet:3000/api/driver/${driver._id}/car`, {
      method: 'PUT',
      body: JSON.stringify({ carId: cars[index]._id }),
      headers: { 'Content-Type': 'application/json' }
    })).json();
  }));

  drivers = await Promise.all(drivers.map(async (driver, index) => {
    return (await fetch(`http://fleet:3000/api/driver/${driver._id}/trip`, {
      method: 'PUT',
      body: JSON.stringify({ tripId: trips[index]._id }),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  }));

  drivers
    .filter(driver => driver._trip)
    .forEach((driver, index) => {
      inspectorPusher.pushCarState({
        carId: driver._car,
        speed: 10 * index,
        coordinates: [23, 23]
      });
    });
}, 2000);

app.use(bodyParser.json());

module.exports = app;

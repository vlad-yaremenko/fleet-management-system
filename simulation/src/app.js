const express = require('express');
const app = express();
const inspectorPusher = require('./core/inspector-pusher');
const mocker = require('./core/mocker');
const gis = require('./core/gis');

mocker().then(({ drivers }) => {
  drivers = drivers.filter(driver => driver._car && driver._trip);

  drivers.forEach(driver => {
    const state = carStateGenerator(driver._trip, driver._car);

    const interval = setInterval(() => {
      const value = state.next().value;

      if (value) {
        inspectorPusher.pushCarState(value);
      } else {
        clearInterval(interval);
        console.log(`I'm done :)`);
      }
    }, 1000);
  });
});

function* carStateGenerator(trip, carId) {
  for (let i = 0; i < trip.path.length - 1; i++) {
    const start = trip.path[i];
    const end = trip.path[i + 1];
    const totalDistance = gis.calculateDistance(start, end);
    const bearing = gis.getBearing(start, end);

    for (let percent = 0; percent <= 100; percent += 10) {
      const distance = (percent / 100) * totalDistance;
      const coordinates = gis.createCoord([10, 10], bearing, distance); // 10, 10 is a mock cause it's needed icon_coord

      yield {
        carId,
        speed: Math.random() * (120 - 40) + 40,
        coordinates
      };
    }
  }
}

module.exports = app;

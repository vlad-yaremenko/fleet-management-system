const fetch = require("node-fetch");
const Faker = require('faker');

module.exports = async () => {
  let drivers;
  let cars;
  let trips;

  await Promise.all([
    ...mockCars(),
    ...mockDrivers(),
    ...mockTrips()
  ])

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

  return {
    drivers,
    cars,
    trips
  };
}

function mockCars() {
  const getCar = () => ({
    "registrationPlate": `${Faker.address.cityPrefix()} ${Faker.random.number()}`,
    "brand": Faker.company.companyName(),
    "model": Faker.internet.userName(),
    "color": Faker.internet.color(),
    "vin": Faker.random.number(),
    "type": "Crossover"
  });

  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(fetch(`http://fleet:3000/api/car`, {
      method: 'POST',
      body: JSON.stringify(getCar()),
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  return promises;
}

function mockDrivers() {
  const getDriver = (i) => ({
    "firstname": Faker.name.firstName(),
    "lastname": Faker.name.lastName(),
    "gander": "male",
    "rate": Faker.random.number(),
    "bornDate": Faker.date.past().toISOString()
  });

  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(fetch(`http://fleet:3000/api/driver`, {
      method: 'POST',
      body: JSON.stringify(getDriver()),
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  return promises;
}

function mockTrips() {
  const getTrip = () => ({
    "budget": Faker.random.number(),
    "path": [[Faker.address.latitude(), Faker.address.longitude()], [Faker.address.latitude(), Faker.address.longitude()], [Faker.address.latitude(), Faker.address.longitude()], [Faker.address.latitude(), Faker.address.longitude()]]
  });

  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(fetch(`http://fleet:3000/api/trip`, {
      method: 'POST',
      body: JSON.stringify(getTrip()),
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  return promises;
}

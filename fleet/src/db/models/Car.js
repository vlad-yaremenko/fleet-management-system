const mongoose = require('mongoose');
const { Schema } = mongoose;
const Faker = require('faker');

const carSchema = new Schema({
  registrationPlate: {
    type: String,
    required: true
  },
  brand: String,
  model: String,
  color: String,
  vin: {
    type: String,
    required: true
  },
  type: String
});

mongoose.model('car', carSchema);

const Car = mongoose.model('car');

module.exports = {
  create: (data) => new Car(data).save(),
  update: (id, data) => Car.findByIdAndUpdate(id, data, { new: true }),
  delete: (id) => Car.findByIdAndDelete(id),
  findAll: (query = {}) => Car.find(query),
  find: (query = {}) => Car.findOne(query),
  findById: (id) => Car.findById(id),
};

// ----------- MOCK -------------------

const getCar = (i) => ({
  "registrationPlate": `${Faker.address.cityPrefix()} ${Faker.random.number()}`,
  "brand": Faker.company.companyName(),
  "model": Faker.internet.userName(),
  "color": Faker.internet.color(),
  "vin": Faker.random.number(),
  "type": "Crossover"
});

for (let i = 0; i < 10; i++) {
  new Car(getCar(i)).save();
}

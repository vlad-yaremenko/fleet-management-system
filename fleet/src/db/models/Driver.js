const mongoose = require('mongoose');
const { Schema } = mongoose;
const Faker = require('faker');

const driverSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: String,
  gender: String,
  bornDate: Date,
  rate: {
    type: Number,
    required: true
  },
  _trip: {
    type: Schema.Types.ObjectId,
    ref: 'trip'
  },
  _car: {
    type: Schema.Types.ObjectId,
    ref: 'car'
  }
});

mongoose.model('driver', driverSchema);

const Driver = mongoose.model('driver');

module.exports = {
  create: (data) => new Driver(data).save(),
  update: (id, data) => Driver.findByIdAndUpdate(id, data, { new: true }),
  delete: (id) => Driver.findByIdAndDelete(id),
  findAll: (query = {}) => Driver.find(query),
  find: (query = {}) => Driver.findOne(query),
  findById: (id) => Driver.findById(id),
  isExists: (query) => Driver.exists(query)
};

// ----------- MOCK -------------------

const getDriver = (i) => ({
  "firstname": Faker.name.firstName(),
  "lastname": Faker.name.lastName(),
  "gander": "male",
  "rate": Faker.random.number(),
  "bornDate": Faker.date.past().toISOString()
});

for (let i = 0; i < 10; i++) {
  new Driver(getDriver(i)).save();
}

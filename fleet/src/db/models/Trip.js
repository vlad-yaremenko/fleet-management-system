const mongoose = require('mongoose');
const { Schema } = mongoose;
const Faker = require('faker');

const tripSchema = new Schema({
  budget: Number,
  status: {
    type: String,
    default: 'requested',
    enum: ['requested', 'in-progress', 'done']
  },
  path: {
    type: [[Number]],
    required: [function () {
      if (this.path.length < 2) {
        throw 'Error';
      }
    }, 'path require at least 2 points']
  }
});

mongoose.model('trip', tripSchema);

const Trip = mongoose.model('trip');

module.exports = {
  create: (data) => new Trip(data).save(),
  update: (id, data) => Trip.findByIdAndUpdate(id, data, { new: true }),
  delete: (id) => Trip.findByIdAndDelete(id),
  findAll: (query = {}) => Trip.find(query),
  find: (query = {}) => Trip.findOne(query),
  findById: (id) => Trip.findById(id),
  isExists: (query) => Trip.exists(query)
};

// ----------- MOCK -------------------

const getTrip = () => ({
  "budget": Faker.random.number(),
  "path": [[Faker.address.latitude(), Faker.address.longitude()], [Faker.address.latitude(), Faker.address.longitude()], [Faker.address.latitude(), Faker.address.longitude()], [Faker.address.latitude(), Faker.address.longitude()]]
});

for (let i = 0; i < 10; i++) {
  new Trip(getTrip()).save();
}

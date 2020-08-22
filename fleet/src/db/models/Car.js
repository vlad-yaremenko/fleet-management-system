const mongoose = require('mongoose');
const { Schema } = mongoose;

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
  type: String,
  _driver: {
    type: Schema.Types.ObjectId,
    ref: 'driver'
  }
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

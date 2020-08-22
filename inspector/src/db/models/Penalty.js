const mongoose = require('mongoose');
const { Schema } = mongoose;

const penaltySchema = new Schema({
  points: {
    type: Number,
    enum: [2, 5],
    required: true
  },
  reason: String,
  _driver: {
    type: Schema.Types.ObjectId,
    ref: 'driver'
  },
  _car: {
    type: Schema.Types.ObjectId,
    ref: 'driver'
  }
});

mongoose.model('penalty', penaltySchema);

const Penalty = mongoose.model('penalty');

module.exports = {
  create: (data) => new Penalty(data).save(),
  update: (id, data) => Penalty.findByIdAndUpdate(id, data, { new: true }),
  delete: (id) => Penalty.findByIdAndDelete(id),
  findAll: (query = {}) => Penalty.find(query),
  find: (query = {}) => Penalty.findOne(query),
  findById: (id) => Penalty.findById(id),
};

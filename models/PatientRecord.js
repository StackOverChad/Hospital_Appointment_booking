const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: Number,
  medicalHistory: String,
  lastVisit: Date,
  prescriptions: [String]
});

module.exports = mongoose.model('Patient', patientSchema);
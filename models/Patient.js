import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  medicalHistory: String,
  lastVisit: Date,
  prescriptions: [String]
});

export default mongoose.model('Patient', patientSchema);
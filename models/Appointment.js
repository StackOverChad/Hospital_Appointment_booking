// models/Appointment.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  doctorId: { type: Number, required: true },
  doctorName: { type: String, required: true },
  doctorSpecialty: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  patientPhone: { type: String, required: true },
  reason: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['booked', 'completed', 'cancelled'],
    default: 'booked'
  }
});

export default mongoose.model('Appointment', appointmentSchema);
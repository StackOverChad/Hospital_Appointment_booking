// routes/appointments.js
import express from 'express';
import auth from '../middleware/auth.js';
import Appointment from '../models/Appointment.js';

const router = express.Router();
router.use(auth);
router.get('/', async (req, res) => {
    try {
      const appointments = await Appointment.find({ userId: req.user._id });
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
// Create appointment
router.post('/', async (req, res) => {
    try {
      const appointment = new Appointment({
        ...req.body,
        userId: req.user._id, // Add this line to link to logged-in user
        status: 'booked'
      });
      
      await appointment.save();
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });



export default router;
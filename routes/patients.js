import express from 'express';
import Patient from '../models/Patient.js'; // Verify this path is correct

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
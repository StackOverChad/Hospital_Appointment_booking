import 'dotenv/config'; // Add at the very top
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.js';
import patientsRouter from './routes/patients.js';
import appointmentsRouter from './routes/appointments.js';
import emailRouter from './routes/email.js';
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/patients', patientsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/email', emailRouter);
// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthcare')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/auth', authRouter);
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
// Health check endpoint
app.get('/health', (req, res) => {
  res.send('Server is running');
});

// Start server
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
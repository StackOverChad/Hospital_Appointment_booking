// routes/email.js
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "mailtrap_user",
      pass: "mailtrap_pass"
    }
  });

// routes/email.js
router.post('/', async (req, res) => {
    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email credentials not configured in environment');
      }
  
      const { to, subject, text } = req.body;
      
      const mailOptions = {
        from: `Healthcare System <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      res.json({ success: true, messageId: info.messageId });
  
    } catch (error) {
      console.error('Full email error:', {
        error: error.message,
        stack: error.stack,
        response: error.response
      });
      res.status(500).json({ 
        error: error.message.includes('credentials') 
          ? 'Server email configuration error' 
          : 'Failed to send email'
      });
    }
  });

export default router;
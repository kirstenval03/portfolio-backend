const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  

  // Send mail
  const mailOptions = {
    from: process.env.EMAIL_USER, // Use the sender's email address
    to: process.env.CONTACT_EMAIL, // Use the contact email address for receiving emails
    subject: subject,
    text: `${name} (${email}) says: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email.');
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

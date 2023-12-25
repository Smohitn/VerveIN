// serverless-function.js

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.post('/submit-interest', (req, res) => {
    const { name, email } = req.body;

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Verve.mohit@gmail.com',
            pass: '',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com', // Replace with your email address
        subject: 'New Interest Submission',
        text: `Name: ${name}\nEmail: ${email}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.json({ success: false });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true });
        }
    });
});

// Start the serverless function
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

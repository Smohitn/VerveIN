// serverless-function.js

const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    const { name, email } = JSON.parse(event.body);

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Verve.mohit@gmail.com',
            pass: 'your-gmail-password', // Use an app-specific password for security
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com', // Replace with your email address
        subject: 'New Interest Submission',
        text: `Name: ${name}\nEmail: ${email}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Internal Server Error' }),
        };
    }
};

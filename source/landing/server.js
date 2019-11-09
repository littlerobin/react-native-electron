const express = require('express');
const path = require('path');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const whitelistSendEmail = ['ferry.hinardi@pt-gps.com', 'info@pt-gps.com'];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/health', (req, res) => res.sendStatus(200));

app.post('/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodeMailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: 'dev@pt-gps.com',
      pass: 'Password123',
    },
  });
  const mailOptions = {
    from: '"Admin Contact Support" <dev@pt-gps.com>', // sender address
    to: whitelistSendEmail, // list of receivers
    subject: 'Contact Exmedia', // Subject line
    html: `<p>Hey, There someone want to contact you:</p>
          <p>
            <div><span style="font-weight: bold">Name</span>: ${name}</div>
            <div><span style="font-weight: bold">Email</span>: ${email}</div>
            <div><span style="font-weight: bold">Phone</span>: ${phone}</div>
            <div><span style="font-weight: bold">Message</span>: ${message}</div>
          </p>`,
  };

  // verify connection configuration
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.redirect('/?status=error&message=Maaf Gagal Menghubungi Kami.');
      return console.log(error);
    }

    console.log('Message %s sent: %s', info.messageId, info.response);
    res.redirect('/?status=success&message=Terima Kasih Sudah Menghubungi Kami.');
  });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

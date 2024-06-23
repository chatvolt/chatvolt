import * as nodemailer from 'nodemailer';

let mailer: nodemailer.Transporter;

if (process.env.NODE_ENV === 'production') {
  // Configurações para o transporte SMTP com SES
  mailer = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER || 'localhost',
    port: parseInt(process.env.EMAIL_SMTP_PORT || '465'),
    secure: true,
    tls: {
      minVersion: 'TLSv1.2',
    },
    auth: {
      user: process.env.EMAIL_SMTP_USER || '',
      pass: process.env.EMAIL_SMTP_PWD || ''
    }
  });
} else { // Dev
  mailer = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    ignoreTLS: true
  });
}
//export { nodemailer };

export default mailer;
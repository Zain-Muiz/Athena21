// const nodemailer = require('nodemailer');
// const mailGun = require('nodemailer-mailgun-transport');

const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: process.env.MAILGUN_NAME, domain: process.env.MAILGUN_HOST});
module.exports =(to,text) => {
    return new Promise((resolve, reject)=> {
        let data = {
            from: 'Registration@istetkmce.in',
            to: to,
            subject: 'ISTE - REGISTRATION OTP',
            // template: "wit_otp",
            //     'h:X-Mailgun-Variables': JSON.stringify({name: mailData.name, otp: mailData.otp})
            text:text
        };
        mg.messages().send(data, function (error, body) {
          if(error) {
              console.log(error);
            //   logger.error(error);
            reject(error);
        }else {
            console.log('Mail sent to', 'sujithvi08@gmail.com');
            resolve('ES');
        }
      });
  });    
}

// myfunc();



// const transporter = nodemailer.createTransport(mailGun(auth));

// const mailOptions = {
//     from: 'web@istetkmce.in',
//     to: 'sujithvi08@gmail.com',
//     subject: 'Test',
//     text: 'Hello'
// };

// transporter.sendMail(mailOptions, function(err, data){
//     if(err){
//         console.log('Error Occurs ', err);
//     } else {
//         console.log('Message sent ');
//     }
// })

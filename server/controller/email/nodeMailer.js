const nodemailer = require("nodemailer");
async function main(name, email, message) {

         var output = 
          `<p>You have a new contact request</p>
          <h3>Contact details</h3>
            <ul>
              <li>${name}</li>
              <li>${email}</li>
            </ul>
          <h3>Message</h3>
          <p>${message}</p>`;

        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'xxxxxx', // generated ethereal user
          pass: 'xxxxxxx' // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      })
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"NodeMailer contact" <xxxxxxx>', // sender address
        to: "xxxxxxx", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      });
      console.log("Message sent: %s", info.messageId);
    }

module.exports = {
main
}
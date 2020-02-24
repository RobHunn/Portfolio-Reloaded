const nodemailer = require("nodemailer");
async function main(name, email, message) {

         var output = 
          ` <div style="margin-left:20px; background-color:gray; color:white; padding:25px; max-width: 800px; min-width:500px;">
                <h2 style="text-align: center;">New contact request</h2>
                <h3>Contact details</h3>
                        <p style="list-style-type: none;">Name: ${name}</p>
                        <p style="list-style-type: none;">Email: ${email}</p>
                <h3>Message</h3>
                <p>${message}</p>
            <div>`;

        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'xxxxxx', // generated ethereal user
          pass: 'xxxxxx' // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      })
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"NodeMailer contact" <xxxxxx>', // sender address
        to: "xxxxxx", // list of receivers
        subject: "New mail from portfolio app", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      });
      console.log("Message sent: %s", info.messageId);
    }

module.exports = {
main
}
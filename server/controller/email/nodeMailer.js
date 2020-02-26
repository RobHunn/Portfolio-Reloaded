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
        port: 465,
        secure: true, 
        auth: {
          user: 'xxxxxx', 
          pass: 'xxxxxx'
        },
        tls:{
          rejectUnauthorized:false
        }
      })
     
      let info = await transporter.sendMail({
        from: '"NodeMailer contact" <xxxxx>', 
        to: "xxxxxx", 
        subject: "New mail from portfolio app", 
        text: "Hello world?", 
        html: output 
      });
      console.log("Message sent: %s", info.messageId);
    }

module.exports = {
main
}
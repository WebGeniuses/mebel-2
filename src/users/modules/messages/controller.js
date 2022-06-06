const nodemailer = require("nodemailer");
const { pass } = require("../../../../config/config");

module.exports = {
  POST: async (req, res) => {
    const { name,  phoneNumber,  message } = req.body;

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Phone: ${phoneNumber}</li>
    </ul>
    <h3>Message</h3>
    <p>${message}</p>
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',    
      port: 586,
      secure:true,
      service: "gmail",
      auth: {
        user:"sattoraliyeviqboljon0@gmail.com",
        pass:pass
       },
    });

    let mailOptions = {
      from: '"mebel uz" <sattoraliyeviqboljon0@gmail.com>',
      to: " uydasot@gmail.com , valisherbotirov1218@gmail.com",
      subject: "uydasot.uz saytidan Xabar",
      //   text: `Name: ${name}
      //          Company: ${company}
      //          Email: ${gmail}
      //          Phone: ${phoneNumber}
      //          Message: ${message}`,
      html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    //   console.log(info);
    //     console.log("Message sent: %s", info.messageId);
    });
    res.status(200).send("Yuborildi");
  },
};

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // IMPORTANT: REMOVE THIS WHEN DEPLOYING IN PROD!
const PORT = process.env.PORT || 5000;

// instantiate an express app
const app = express();
// cors
app.use(cors({ origin: "*" }));

app.use("/", express.static(process.cwd() + "/")); 

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Excepción --> " + error);
  } else {
    console.log("El servidor inicio correctamente.");
  }
});

app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    
    const mail = {
      from: `${data.email}`,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ status: "500", message: "Hubo un error: " + err });
      } else {
        res.status(200).json({ status: "200", message: "El mail se envio correctamente!" });
      }
    });
  });
});

//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/index.html");
});

/*************************************************/
app.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}...`);
});
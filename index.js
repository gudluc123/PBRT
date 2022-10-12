const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
dotenv.config();

let port =process.env.PORT;
let databaseUrl = process.env.DB_URL;
let userName = process.env.USER_NAME;
let passWord = process.env.PASS_WORD;
let adminMail = process.env.TO;
let hostMail = process.env.HOST;

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoDb Is Connected"))
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
  },

  number: {
    type: Number,
    trim: true,
  },

  message: {
    type: String,
  },
});

var pbrtUser = new mongoose.model("User", userSchema);

app.post("/handleData", async (req, res) => {

  try {
    
    

    let myData = await pbrtUser.create(req.body);
    
    console.log(myData)

    var transport = nodemailer.createTransport({
      host: hostMail,
      port: 587,
      auth: {
        user: userName,
        pass: passWord,
      },
    });

    var mailOptions = {
      from: req.body.email,
      to: adminMail,
      subject: "review message",
      html: `<h3>user details :</h3> <p style="font-size:10px"> name: ${myData.name}, <br> email: ${myData.email}, <br> phoneNumber: ${myData.number}, <br> message: ${myData.message} </p>`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }

      console.log("Email sent: " + info.response);
      return mailOptions.html;
    });


    // return res.send("fine")

  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
})
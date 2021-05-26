const express = require("express");
const morgan =  require("morgan");
const cors =  require("cors");
const httpError =  require("http-errors");
require("dotenv").config();
require("./helpers/init_mongo");;
const User = require("./models/users");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const PORT = process.env.PORT || 8080;

const app = express();


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../build'));
}

app.post('/api/get', async function(req,res,next){
    
    // const body = {
    //     email: "Shubham",
    //     state: "Odisha",
    //     district: "Koraput",
    //     pin: 321321,
    //     vaccine: 1,
    //     isfree: true,

    // } 

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: 'cowin.notify.2019@gmail.com',
          pass: 'cowinnotify'
      }
  });



    
    const body =  req.body;
    body.emailtoken = crypto.randomBytes(64).toString('hex');
    const usr = new User(body);
    

    let r =  await transporter.sendMail({
      from: 'cowin.notify.2019@gmail.com',
      to: body.email,
      subject: 'Test Email Subject',
      html: `<p>Please verify using this link http://localhost:5000/api/verify?token=${body.emailtoken}</p>`
  });

    console.log(r);

    try{

    usr.save((err)=>{
        if (!err) res.send("Successful");
        else res.send({"Error Occured": err.toString()});
    });}
    catch(error) {
        next(error);
    }
});

app.get("/api/verify", async function(req,res,next) {

  const user = await User.findOne({emailtoken: req.query.token});
  if(!user) res.send("Token Invalid");
  user.isVerified = true;
  user.save((err)=> {
    if (!err) res.send("Successful");
        else res.send({"Error Occured": err.toString()});
  });

} );

app.use(async (req, res, next) => {

    next(httpError.NotFound()); // createError package
  });

app.use((error, req, res, next)=> {

    res.status(500);
    res.send({"error code": error.toString(), "error status": 500});
});



  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
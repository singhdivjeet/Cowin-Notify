const mongoose = require("mongoose");

console.log(process.env);
mongoose.connect(process.env.MONGODB_URI,{dbName: process.env.DB_NAME,useNewUrlParser:true,useFindAndModify:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
.then(()=> {console.log("MongoDB connected")})
.catch((err)=> { console.log(err.message);});

mongoose.connection.on("connected",() => {
    console.log("MongoDB connected to DB");
});

mongoose.connection.on("error",(err)=> {console.log(err.message);});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected");
  });
  
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
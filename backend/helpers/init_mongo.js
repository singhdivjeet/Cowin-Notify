const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://mushin:mushin2019@cluster0.3dkfx.mongodb.net/test',{dbName: 'covid19',useNewUrlParser:true,useFindAndModify:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
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
const mongoose = require("mongoose");
const MongodbConnection =async ()=>{
    mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
    
  

}

module.exports = MongodbConnection
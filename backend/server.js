const app = require("./app");
const cloudinary = require("cloudinary")
const dotenv = require("dotenv")
const mongodbConnect = require("./config/database")
//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1)
})
//config

dotenv.config({ path: "backend/config/config.env" })
//connection with mongodb
mongodbConnect()

//congfig cloudinary
cloudinary.config({ 
    cloud_name:process.env.cloud_name, 
    api_key:'865393329238635', 
    api_secret:process.env.api_secret 
  });
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

//unhandled promise rejection

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise Rejection`);
    server.close(() => {
        process.exit(1);
    })
})

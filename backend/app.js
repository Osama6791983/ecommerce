const express = require("express");
const app = express();
const bodyparser = require("body-parser")
const cookieParser = require("cookie-parser");
const express_fileupload = require("express-fileupload")
const errorMiddleware = require("./middleware/error")
app.use(bodyparser({extended:true}))
app.use(express_fileupload())
app.use(express.json())
app.use(cookieParser())

//Route imports
const product = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute")
app.use("/api/v1", product)
app.use("/api/v1",userRoute)
app.use("/api/v1",orderRoute)
//midleware for error
app.use(errorMiddleware)

module.exports = app;

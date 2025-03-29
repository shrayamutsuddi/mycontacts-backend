const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbconnection");
const app = express();
connectDb(); //connect to database
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes")); //middleware
app.use(errorHandler);
app.listen(port, ()=>{
    console.log(`Server up and running on port ${port}`);
});
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
const connectDb = async() =>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected: ", 
            connect.connection.host, 
            connect.connection.name,
            connect.connection.port
        );
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDb;

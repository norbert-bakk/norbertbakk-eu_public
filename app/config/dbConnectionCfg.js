// modules and settings for connection to the DB
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// database connection
const openDbConnection = () => {
    mongoose.connect(process.env.DB_URI);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Connection error:"));
    db.once("open", () => {
        console.log("Connected to the database");
    });
};

// exporting the function, so it can be used in todoapp.js to connect to the db
module.exports = openDbConnection;
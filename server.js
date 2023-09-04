const express = require("express");
const session = require("express-session");
const path = require("path");
const qr = require("qr-image");
const fs = require("fs");
const openDbConnection = require("./app/config/dbConnectionCfg.js");
const app = express();
require("dotenv").config();

// setting up middleware & serve static files from the "public" directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/app/public/")));

// setting up the session middleware to be used in the app
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// calling the function to open the database connection
openDbConnection();

// setting up EJS as the view engine, EJS templates are inside of app/views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/app/views/"));

// defining routes
const homeRoutes = require("./app/routes/all-router.js");
app.use("/", homeRoutes);

// API key route for the weather app
// server.js
app.get("/api/api-key", (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});


// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
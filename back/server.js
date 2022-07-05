const express = require('express');
const path = require('path')
const cors =  require("cors")
const flash = require("connect-flash")
const session = require("express-session")
const passport = require("passport")
const MySQLStore = require("express-mysql-session")(session);

var options = {
  host: "192.168.64.3",
  user: "alldb",
  database: "alldb",
  password: "",
};
const sessionStore = new MySQLStore(options);
const fileupload = require("express-fileupload");
const { json } = require('express');
const app = express();
require("dotenv").config();
app.use(fileupload({ createParentPath: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}))
app.use(json())
app.set("view engine", "ejs");
app.use(flash());
app.use(session({ secret: "fgnodsfighosfighoghvu", store: sessionStore, resave: false, saveUninitialized: false }))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
require("./app/routers/routers")(app);
require('./app/models/db.config');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {    console.log(`The server is running on port ${PORT} successfuly`)});


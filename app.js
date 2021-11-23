const express = require("express");
const mongoose = require("mongoose");
import cookieParser from "cookie-parser";
import cors from "cors";
const morgan = require("morgan");
require('dotenv').config();

//routes
const routes = require('./routes/pass_auth');


//models
mongoose.connect("Harbor:08310831@mongodb://raymondubuntu.ddns.net:27017/admin" , {dbName: "Harbor" })
.then(() => {
        console.log("database connected");
    });
    

const app = express();
const port = process.env.PORT || 3000

app.use(cors({origin : true, credentials:true}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended : false} ));
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));

//passport.js 사용
const passport = require('passport');
const passportConfig = require("./config/passport")
app.use(passport.initialize());
passportConfig();

app.use('/auth', routes);

// // Handle errors
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.json({ error: err, reason : "몰라 에러" });
// });

//express server on
app.listen(port, ()=>
    console.log(`"start! express server on port ${port}"`));

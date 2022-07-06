const express = require('express');
const app = express();
const morgan = require('morgan');
//Used of json
const bodyParser = require('body-parser');
// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(morgan('dev'));
app.use(bodyParser.json());

const authRoutes = require("./Routes/route_auth");

const messageRoutes = require("./Routes/route_message");


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();

  });
;
let resultat;

//AUTH ROUTE

app.use("/api/auth", authRoutes);


app.use("/api/message",messageRoutes);



module.exports = app;
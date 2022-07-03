const express = require('express');
const app = express();
const morgan = require('morgan');
//Used of json
const bodyParser = require('body-parser');
app.use(express.json());

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
//INstallation de mysqm
//npm install mysql
/*
const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database:'dbtest1'
})


 connection.connect((err)=>{
    if(err){
        console.log("°°°°°°°°°°°°°°°°Err connecting");
        console.log(err);
        return;
    }
    console.log("++++++++CONNECTION OK ++++++++++++");

});

*/
// console.log("connx heyyy");
// console.log(connection);
let resultat;
/*
// connection.query('SELECT nom FROM user_ WHERE id = 1',(error,res,field)=>{
// connection.query('CALL getusers()' ,(error,res,field)=>{
connection.query('CALL jourPairouImpair()' ,(error,res,field)=>{
    if(error){
        console.log(error);
        throw error;
    }
    myres = JSON.stringify(res);
    p_res = JSON.parse(myres);
    console.log("VVVVVVVVVVVVsolution isVVVVVVVVVVV");
    // console.log(p_res[0][0].nom);
    console.log(res);
    console.log(res[0][0]);
    // console.log(res[0].nom);
    // console.log(res);
    // const res_str = JSON.parse(JSON.stringify(res));
    // console.log(">>>Stringif Res");
    // const res_pars = JSON.parse(res_str);
    // console.log(res_str[0].nom);
    // console.log(res_pars[0].nom);
    //  resultat = res[0].nom;
})

*/

//   app.use((req,res) => {
//     console.log("mon serveur");
//         res.status(200).json({message:`OKay pour le serveur Resultat est ${resultat}`});
//     //     res.end("ok Serveur");
//     console.log(">>>>>>>>>>> CONNECTON<<<<<<<<<");
//     console.log(resultat);
//   })

//AUTH ROUTE

app.use("/api/auth", authRoutes);


app.use("/api/message",messageRoutes);



module.exports = app;
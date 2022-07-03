const mysql = require('mysql');

const connection = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        // password: 'rootpass;',
        password: '',
        database:'groupomania' 
    }
   
);

connection.connect((err)=>{
    if(err){
        console.log("°°°°°°°°°°°°°°°°Err connecting");
        console.log(err);
        return;
    }
    console.log("++++++++CONNECTION OK ++++++++++++");

});

module.exports = connection;
const app = require('./app');
const http = require('http');
app.set('port',process.env.PORT || 3000);
const server = http.createServer(app);
// const server = http.createServer((req,res) =>{
//     console.log("mon serveur");
//     // res.status(200).json({message:"OKay pour le serveur"});
//     res.end("ok Serveur");
// })




server.listen(3000);
// const token = req.headers.authorization.split(" ")[1]; 

exports.hasToken = (req,res,next)=>{
    console.log("IN VERIF TOKEN TO HASSSSSSSSSSSSSSSSS TOKEN");
    console.log(req.headers.authorization);
    next();
}
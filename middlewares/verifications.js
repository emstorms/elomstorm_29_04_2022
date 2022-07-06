// const token = req.headers.authorization.split(" ")[1]; 

exports.hasToken = (req,res,next)=>{
    console.log("IN VERIF TOKEN TO HASSSSSSSSSSSSSSSSS TOKEN");
    console.log(req.headers.authorization);
    next();
}

exports.authorize = (req, res, next) => {
    try {

      const token = req.headers.authorization.split(" ")[1]; 
     
      const decodedToken = verif_user_token.verify(token, process.env.TOKEN_ENCODE_CODE); 
      const userId = decodedToken.userId; 
     
      req.auth = { userId };
       
     
      if (req.body.userId && req.body.userId !== userId) {

        throw "User Id non valable !";                     
      } else {

        next();
      }
    } catch (error) {
      res.status(401).json({ error: error | "requête non authentifiée !" });
    }
  };
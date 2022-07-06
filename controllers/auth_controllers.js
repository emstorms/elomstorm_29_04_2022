// const connection_old = require("../my_connetion/db_connection");
const validator = require("validator");
const token = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const connection = require("../my_connection/db_connection");

// user

// const { my_conn } = require("../app");


exports.deleteUser = (req,res,next) =>{
    try{
          console.log("+++++++IN DELETE BACK CONTROLLER");
          res.status(200).json({message: "OK Going to DELETE the user"});
          console.log(req.params.id);
          const query_text = `Delete from user_ where id = ${req.params.id}`;
          connection.query(query_text, (error,resultat,field) =>{
            if(error){
                // 
                console.log("error");
                throw ("Error sending request");
                }
                 res.status(200).json({message: "USER IS DELETED"});

            });
        

    }catch(err){
        console.log("ERRRROR---------- Delete user");
        console.log(err);
        res.status(401).json({message: "ERROR GETTING USers INFO"});

    }   
}




exports.getUsers = (req,res) =>{
    try{
        console.log("GET USers");
            const users_info_query ="SELECT `id`, `id_role`, `email`, `last_name`, `first_name`, `pseudo` FROM `user_` ";

            //DB VERIFICATION
        
            connection.query(users_info_query, (error,resultat,field) =>{
            if(error){
                // 
                console.log("error");
                throw Error("Error sending request");
                }
                console.log("RESULTAT ++++++++++++++++++++++");
                console.log(resultat);
                //  res.status(200).json({message: "OK We get all Users Info"});
                 res.status(200).json(resultat);

            }); 
    }catch(err){
        console.log("-----WE GOT ERROR");
        res.status(400).json({message: "ERROR GETTING USers INFO"});
    }
 
}



exports.subscription = (req,res) =>{
    try{
        console.log("IN SUBCRIPTION controller");
        console.log(req.body);
        let bad_inputs = [];
        console.log("BAD INPUT");
        console.log(bad_inputs);
        for(let k in req.body){
            // console.log(`Key ${k}`);
            console.log("CONTAIN");
            console.log(req.body[k]);
            // console.log(validator.isEmpty(req.body[k]));
    
            if(validator.isEmpty(req.body[k])){
                bad_inputs.push(k);
            }
            if(bad_inputs.length > 0 ){
                console.log("BAD INPU LENGTH");
                console.log(bad_inputs.length);
                throw Error('La valeur du champ ' + k + ' est invalide ');
            }
            

        }
        console.log("EMAIL °°°°°");
        console.log(req.body['email']);
        //INSERT INTO DATA BASE

        //HASH password
       
        bcrypt.hash(req.body.password,10)
            .then(hash => {
              const hashed_passwd = hash;  
              console.log("++++++++++PASSWORD IS HASHED+++++++++");
              console.log(hashed_passwd);
              //Setting the request
              const newuser_request =`INSERT INTO user_(email, password_, last_name, first_name, pseudo) 
              VALUES("${req.body['email']}","${hashed_passwd}","${req.body['last_name']}","${req.body['first_name']}","${req.body['pseudo']}")`;

              //DB VERIFICATION
            
                 connection.query(newuser_request, (error,resultat,field) =>{
                 if(error){
                    // 
                    if(error.sqlState == 23000 || error.code =='ER_DUP_ENTRY'){
                        console.log("-------THAT Email Already Exists");
                        throw("this email is already used. Try another one");
                    }
                    // throw error;
                }
                res.status(200).json({message: "User Is saved"});
        
            }); 

            });
      
    }catch(err){
        console.log("IN CAAAATCHQQQQQQQQ");
        // console.log(err);
        res.status(400).json({message: "ERRREUR PENDANT LA REQUETE"});
    }
   
    // check value
    //Empty
}

exports.login = (req,res) => {
    try{
        // console.log("IN LOGIN CONTROLLER");
        // console.log(req.body);
        is_valid_log = false;
        const log_data = req.body;

        let log_message = {is_valid_log: false};

            // REQUEST FOR HASH COMPARE!

        const request_text = `SELECT COUNT(*) AS nb_exists,id as user_id,id_role AS id_role,pseudo, (SELECT password_ FROM user_ WHERE email ="${log_data['email']}") AS iscorrect_pass
        FROM user_ WHERE email ="${log_data['email']}";`;
        // console.log("00000000000REQUEST");
        // console.log(request_text);
                                        /**********************
                                            SUBBSCRIPTION query
                                         **********************/
                                        
        console.log(log_message.is_valid_log);
        connection.query(request_text,(err,resultat) => {
        if(err){
            console.log(err);
            // throw error;
             throw ("-----TRHOWN ERROR =>Email inexistant => créer un autre email---");
        }
        
        //   console.log("RESULTAT nb_exists and iscorrect_pass");
        //   console.log(resultat);
    
   if(!resultat[0].nb_exists){
    // console.log("Email inexistant => créer un nouveau");
    // throw new Error("-----TRHOWN ERROR =>Email inexistant => créer un autre email---");
    // throw new Error("-----TRHOWN ERROR =>Email inexistant => créer un autre email---");
    //  res.status(300).json({message:`----TRHOWN ERROR =>Email inexistant => créer un autre email--- ${err}`}).send(err);
   }
   if(!resultat[0].iscorrect_pass){
    console.log("PASssword");
    console.log(resultat[0]);

   }

                                        /**********************
                                            ??????HASHE COMPARE?
                                         **********************/
    console.log(resultat[0]);
    bcrypt.compare(req.body.password,resultat[0].iscorrect_pass)
        .then(isCorrectPassword => {
            if(!isCorrectPassword){
            throw new Error("Your Password is Incorrect");
             
                // return res.status(401).json({message:`IMPOSSIBLE DE SE CONNECTER ${err}`}).send(err);
            }
                //
                                     /**********************
                                            TOKEN
                                    **********************/
            console.log("++++++++BEFORE TOKEN");
            console.log(resultat[0]);
            res.status(200).json({
                //   console.log(resultat[0]),
                    userId: resultat[0].user_id,
                    id_role: resultat[0].id_role,
                    pseudo: resultat[0].pseudo,
                    //   console.log(resultat[0])
                    token: token.sign(               
                    { userId:resultat[0].user_id ,
                    id_role:resultat[0].user_role,
                    pseudo:resultat[0].pseudo,
                    },
                    
                    `${"CODE_TOKEN"}`,
                    { expiresIn: '48h' }
                    )                
                });         
            })
                                       
   console.log("USER IS COORECTLY LOGGED SET is_valid_login true");

})


    }catch(err){
        console.log("*******ERROR LOGIN************");
        // console.log(err);
        res.status(400).json({message:`IMPOSSIBLE DE SE CONNECTER ${err}`});
    }


}


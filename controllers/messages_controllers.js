// const connection = require('../my_connetion/db_connection');
const connection = require('../my_connection/db_connection');




// exports.list_message = (req,res => {
//     console.log("in list_message middleware");
// })

exports.create_new_article = (req,res,next) =>{
    console.log("+++++++IN BACKEND MESSAGE CONTROLLER");
    console.log(req.body);
    // console.log(req);
    
    // const request_message ="INSERT INTO article_message(text_title,text_content,owner_id,owner_name)";
/*
    const request_text =`INSERT INTO article_message (text_title,text_content,article_owner_id,imgUrl,imgAlt)

    VALUES("${req.body.title}","${req.body.message_content}",${req.body.article_owner_id},"${req.body.image_url}","${req.body.image_alt}",);`;
    */
/*
    const request_text =`START Transaction;
SET @my_var = (SELECT pseudo FROM USer_ Where id = 14);
INSERT INTO article_message (text_title,text_content,article_owner_id,imgUrl,imgAlt,pseudo)
  VALUES("${req.body.title}","${req.body.message_content}",${req.body.article_owner_id},"${req.body.image_url}","${req.body.image_alt}",@my_var);
COMMIT;`;
*/
const request_text =`INSERT INTO article_message (text_title,text_content,article_owner_id,imgUrl,imgAlt,ownerPseudo)

VALUES("${req.body.title}","${req.body.message_content}",${req.body.article_owner_id},"${req.body.image_url}","${req.body.image_alt}",(SELECT pseudo FROM user_ WHERE id = ${req.body.article_owner_id}));`;


    console.log(request_text);
    // ,"${LOAD_FILE('req.body.imgUrl}')}"


    connection.query(request_text,(err,resultat) => {
        if(err){
            console.log(err);
            // throw error;
            return;
        }
        
          console.log("MESSAGE SENT");
          console.log(resultat);
    
    })

   

    res.status(200).json({message:"NEW ARTICLE CONTROLLER"});
}


exports.create_new_answer = (req,res,next) =>{
    console.log("IN CREATE NEW ANSWER°°°°°°°°°°°°°°°°°°°°°°°");
    console.log(req.body);
    const string_img = JSON.stringify(req.body.image_url_file);
    const request_text = `INSERT INTO answer_article(id_article,id_user,text_title,text_content,image_url,image_alt,image_file,owner_pseudo)
    VALUES(${req.body.article_id},${req.body.answer_owner_id},"${req.body.title}","${req.body.message_content}","${req.body.image_url}","${req.body.img_alt}","${req.body.image_url_file}",(SELECT pseudo FROM user_ WHERE user_.id = ${req.body.answer_owner_id}))`;
    // VALUES(${req.body.article_id},${req.body.answer_owner_id},"${req.body.title}","${req.body.message_content}","image","image_alt")`;

    connection.query(request_text,(err,resultat) => {
        if(err){
            console.log(err);
            res.status(400).json({message:"CAN END REQUEST"}).send({message:"Request not Fullfilled"});
        }
        // console.log(resultat);
        res.status(200).json({message:"La REPONSE au message a correctement Céee"});
    })
   
    // res.status(200).json({message:"La Réponse a été correctement émise"});
}


exports.showArticles = (req,res,next) => {
    console.log("IN SHOW Article");
    console.log(req.body);
    const request_text = "SELECT * FROm article_message ORDER BY dateCreated DESC ";
    connection.query(request_text,(err,resultat) => {
        if(err){
            console.log(err);
            // throw error;
            return;
        }
        
          console.log("SELECT * FRom MEssage");
          console.log(resultat[0].id);
          let sendres = [];
          sendres = [...resultat];
        //   console.log(sendres);
         res.status(200).json(sendres);
    })

    
    // res.status(200).json({message:"Messages"});
}

exports.show1Article = (req,res,next) =>{
    console.log("++++++++++In SHOW article ID Controller");
    console.log(req.params);
    request_text = `Select * FROM article_message WHERE id = ${req.params.id}`;
    console.log(request_text);
    connection.query(request_text,(err,resultat) => {
        if(err){
            console.log(err);
            res.status(400).json({message:"CAN END REQUEST"}).send({message:"Request not Fullfilled"});
        }
        console.log(resultat);
        res.status(200).json(resultat[0]);
    })
    
}

exports.deleteMessage = (req,res,next) =>{
    console.log("++++++++++DELETE CONTROLLERS BACKEND+++++");
    console.log(req.params);
    request_text = `DELETE FROM article_message WHERE id = ${req.params.id}`;
    // request_text = `SELECT * FROM article_message WHERE id = ${req.params.id}`;
    connection.query(request_text,(err,resultat) => {
        if(err){
            console.log(err);
            return;
        }
        // console.log(resultat);
        res.status(200).json({message:"Le message a correctement été supprimé"});
    })
    
}

exports.get_article_answers = (req,res,next) => {
    console.log("GET article answer list");
    console.log(req.params);
    const request_text =`SELECT * FROM answer_article WHERE id_article = ${req.params.id}`;
    console.log(request_text);
    connection.query(request_text,(err,resultat) => {
        if(err){
            console.log(err);
            res.status(400).json({message:"CAN END REQUEST"}).send({message:"Request not Fullfilled"});
        }
        console.log(resultat);
        console.log("RESULTAT ");
        // console.log(typeof resultat);
        console.log(resultat);       
        res.status(200).json(resultat);
      
    })
  
      
    
}




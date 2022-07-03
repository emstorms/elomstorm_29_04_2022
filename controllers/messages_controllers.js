// const connection = require('../my_connetion/db_connection');
const connection = require('../my_connection/db_connection');



// exports.list_message = (req,res => {
//     console.log("in list_message middleware");
// })

exports.create_new_article = (req,res,next) =>{
    console.log("+++++++IN BACKEND MESSAGE CONTROLLER");
    console.log(req.body);
    console.log(req.body.dateCreated);
    
    // const request_message ="INSERT INTO article_message(text_title,text_content,owner_id,owner_name)";
    const request_text =`INSERT INTO article_message (text_title,text_content,article_owner_id,ownerName,ownerPseudo,imgUrl,imgAlt)

    VALUES("${req.body.text_title}","${req.body.text_content}",${req.body.article_owner_id},"name",${req.body.ownerPseudo},"${req.body.imgUrl}","${req.body.imgAlt}");`;
    

    console.log(request_text);
    // ,"${LOAD_FILE('req.body.imgUrl}')}"
    connection.query(request_text,(err,resultat) => {
        if(err){
            console.log(err);
            // throw error;
            return;
        }
        
          console.log("RESULTAT nb_exists and iscorrect_pass");
          console.log(resultat);
    
    })

    res.status(200).json({message:"NEW ARTICLE CONTROLLER"});
}

exports.showArticles = (req,res,next) => {
    console.log("IN SHOW Article");
    console.log(req.body);
    const request_text = "SELECT * FROm article_message ORDER BY dateCreated DESC";
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
//Make this class usable anywhere using Input decorator
import { Input } from "@angular/core";


export class Article_message{
    id ?: Number;
    article_owner_id !: Number;
    article_type_id ?: Number;
    //Foreigner Key
    answer_id ?: Number;
    dateCreated !: Date;
    text_content !: String;
    text_title !: string;
    //image setting
    imgUrl ?: String; 
    imgAlt ?: String;
    ownerName ?:String;
    ownerPseudo ?: string;
    to_answer ?: boolean;
    is_annonce ?: boolean = false;   
}

export interface Message{
    id : Number;
    article_owner_id : Number;
    article_type_id : Number; //annonce or not
    //Foreigner Key
    answer_id : Number;
    dateCreated : Date;  
    text_content : String;
    text_title : string;
    //image setting
    imgUrl : String; 
    image_url : String;
    imgAlt : String;
    ownerName :String;
    ownerPseudo : string;
    //answer button fired?
    to_answer : boolean;
    nb_answer : Number;
    is_annonce : boolean;
}

export interface Answer{
    answer_id : Number;
    answer_owner_id : Number;
    date_created : Date;
    message_content : String;
    image_url : String;
    image_url_file :File;
    imgage_alt : String;
    title : String;
    //Article information
    id_article : Number;
    owner_pseudo : String;
}

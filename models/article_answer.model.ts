export class Answer_message{
    answer_id !: Number;
    answer_owner_id !: Number;
    date_created !: Date;
    message_content !: String;
    text_content ?: String;
    // messageTitle !: String; NO Title for answer
    //image setting
    image_url !: String;
    img_url ?: String;
    image_alt !: String;
    title ?: String;
    text_title ?: String;
    //Article information
    article_id !: String;
    id_article ?: String;
    id_user ?: String;
    image_url_file ?:File;
    image_file ?: String;
    ownerPseudo !: String;
    owner_pseudo ?: String;

    //Simple polling
    likes?:String[];
    diLikes?:String[];
}

export interface Polling_data{
    pseudo : String;
    article_id: Number;
}

export interface Answer{
    answer_id : Number;
    answer_owner_id : Number;
    date_created : Date;
    message_content : String;
    // messageTitle !: String; NO Title for answer
    //image setting
    image_url : String;
    imgage_alt : String;
    title : String;
    //Article information
    article_id : String;
}
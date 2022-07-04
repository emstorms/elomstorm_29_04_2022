export class Answer_message{
    answer_id !: Number;
    answer_owner_id !: Number;
    date_created !: Date;
    message_content !: String;
    // messageTitle !: String; NO Title for answer
    //image setting
    image_url !: String;
    imgage_alt !: String;
    title ?: String;
    //Article information
    article_id !: String;
}
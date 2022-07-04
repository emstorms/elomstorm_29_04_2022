import {Injectable} from '@angular/core';
import { Article_message, Message } from '../models/article-message.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap ,catchError} from 'rxjs';
import { switchMap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
// import { Subscription_model } from '../models/subscription.model';
import { throwError } from 'rxjs';
import { of } from 'rxjs';
import { Subject } from 'rxjs';
import { Answer_message } from 'models/article_answer.model';
import { AuthService } from './auth.service';



//mkake the service  usable from everywhere setting provideIn: Root in the @Injectable decorator
@Injectable({
    providedIn :'root'
})

export class MessageService{
    //members
    canCreateMessage!: boolean;
    constructor(private http : HttpClient, private auth:AuthService){

    }
    // sub_model !: Subscription_model;
    // obs_subscription_data$!: Observable<Subscription_model>;
    article_model !: Article_message;
    message !: Message;

    // list_article$ = new Subject<Article_message[]>();
    list_article$ !: Observable<Article_message[]>;
    //will hold the request result and make list of all messages and their answer
 
        // getArticles() : Observable<Article_message[]>{
         getArticles_v2():Observable<Message[]>{
            const request_url ="http://localhost:3000/api/message/messages";
            return this.http.get<Message[]>(request_url);
        }

        getArticleById(id : Number): Observable<Message>{
            const request_url =`http://localhost:3000/api/message/messages/${id}`;
            console.log(request_url);
            return this.http.get<Message>(request_url).pipe(
                tap(cont => {
                    console.log("++++++GET ARTICLE ID SERVICE");
                })
            )
        }
   
        /*     getArticles(){
            const request_url = "http://localhost:3000/api/message/messages"
             return this.http.get<Article_message[]>(request_url).pipe(
                tap(list_article => {
                    this.list_article$.next(list_article);
                }),
                tap(list => {
                    console.log("LIST MESSAGE")    ;
                    console.log(list);
                }),
                catchError(error => {
                    console.error(error.error.message);
                    return of([]);
                  })  
            ).subscribe();
        }

      */  

        //Create an article
        create_message(){
            this.canCreateMessage = true;
        }

        // create_article(model_mess : Article_message, file ?:any){
        create_article(model_mess : Message, file ?:any):Observable<HttpResponse<Message>>{
            console.log("IN SERVICE CREATE ARTICLE");
            console.log(model_mess);
            console.log("File");
            console.log(file);
            //add ID From localstorage
            model_mess.article_owner_id = Number(localStorage.getItem('id'));
        
            //SENDING POST request
            const post_message_url ="http://localhost:3000/api/message/new_message";
            // return this.http.post<{message:string ,message_content: string, image_url: string, image_alt: string, annonce_check: string}>(post_message_url,model_mess,{observe :'response'}).pipe(
  
            // return this.http.post<{message:string}>(post_message_url,model_mess,{observe :'response'}).pipe(
            return this.http.post<Message>(post_message_url,model_mess,{observe :'response'}).pipe(
                tap(cont => {
                    console.log(`%cIN MESSAGE SERVICE SENDING POSTING WITH POST ${cont}`,"color:blue");
                }),
                catchError(error => throwError(error.error.message))
            )
            

        }

        delete_article(id_message :Number) :Observable<any>{
            const request_url=`http://localhost:3000/api/message/messages/${id_message}`;
            // console.log("DELETE MESSAGE SErvice");
            console.log(request_url);
            
            // return this.http.delete<any>(request_url);
            return this.http.delete<{message:string}>(request_url).pipe(
            // return this.http.delete<{message:string}>("http://localhost:3000/api/messages/"+id_message).pipe(
                tap(cont => {
                    console.log("++++++++++++DEL CONT");
                    console.log(cont);
                }),
                catchError(error => throwError(error.error.message))
            );
        }

        answer_article(model_answer :Answer_message,file :string) : Observable<Answer_message>{
            // answer_article(model_answer :Answer_message){
            const options = {headers: {'Content-Type': 'application/json'}};
            console.log("ANSwER ARTICLE");
            const request_url = "http://localhost:3000/api/message/new_answer";
            let formD = new FormData();
            formD.append("model",JSON.stringify(model_answer));
            formD.append("file",file);
            model_answer.answer_owner_id = Number(this.auth.getUserId2());
            // this.http.post<{message:"string"}>(request_url,file).pipe(
           return this.http.post<Answer_message>(request_url,model_answer,{observe:"body"}).pipe(
            // this.http.post<{message:"string"}>(request_url,JSON.stringify(model_answer),options).pipe(
                tap(cont => {
                    console.log("IN PIPE TAP FROM ANSWER ARTICLE *messageService*");
                    console.log(cont);
                })
                // con
            )
            /*
            .subscribe(resp => {
                console.log("SUBSCRIPT RESPONSE!!!");
                console.log(JSON.stringify(resp.message));
                // this.getAnswersById()
                    console.log(model_answer.article_id);
                    // this.getAnswersById(model_answer.article_id);     
             
            });
            */
        }

        getAnswersById(article_id :number) : Observable<Answer_message[]>{
            let model_answer :Answer_message;
            
            const request_url = `http://localhost:3000/api/message/messages/article_answer_list/${article_id}`
            return this.http.get<Answer_message[]>(request_url).pipe(
                tap(cont => {
                   
                    if(cont.length > 0){
                         console.log("MESSAGE LIST ID");
                        console.log(cont);
                    }
                    
                })
            )
            // ).subscribe();
    
        }

        
    


/*
        addNewUser(routeUrl :string ="YY",typeName :string ="MESS"):Observable<string>{
        // addNewUser(routeUrl :string ="YY",typeName :Object):Observable<Object>{
            routeUrl ="http://localhost:3000/api/auth/signup";
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
              };
            // return this.http.post<string>(routeUrl,":D Hey Post from Front end").pipe(
            
            return this.http.post<string>(routeUrl,typeName).pipe(
            // return this.http.post<Object>(routeUrl,typeName).pipe(
                tap( (mess) => console.log(`In TAP Operator FROm Observable ${mess}`))
                // switchMap(typeName_ => this.http.post<string>(routeUrl,typeName))

            )
          }
          
    */

}
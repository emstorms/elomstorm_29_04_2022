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


//mkake the service  usable from everywhere setting provideIn: Root in the @Injectable decorator
@Injectable({
    providedIn :'root'
})

export class MessageService{
    //members
    canCreateMessage!: boolean;
    constructor(private http : HttpClient){

    }
    // sub_model !: Subscription_model;
    // obs_subscription_data$!: Observable<Subscription_model>;
    article_model !: Article_message;

    // list_article$ = new Subject<Article_message[]>();
    list_article$ !: Observable<Article_message[]>;
    //will hold the request result and make list of all messages and their answer
 
        // getArticles() : Observable<Article_message[]>{
         getArticles_v2():Observable<Article_message[]>{
            const request_url ="http://localhost:3000/api/message/messages";
            return this.http.get<Article_message[]>(request_url);
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
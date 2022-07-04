import { Injectable } from '@angular/core';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable ,of, retry} from 'rxjs';

                //models
import { Login_model, userInfo, userModel } from 'models/user.model';
//ERoor Lib
import { catchError,map,tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { InterfaceMessageService } from 'src/app/interface-message.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})




  //login

  //Log user


export class AuthService {


  private token !: String;
  private userId !: String;
  private isLogged = false;
  private idRole !: Number;
  private pseudo !:string;
  public userId2 !:Number;
  private storg_islog !:boolean;
  usid !:Number;

  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, app_message : InterfaceMessageService) { }


  //methods
                //LOGIN
  // login(login_data : Login_model){
  login(login_data : Login_model): Observable<HttpResponse<{userId:string,id_role:Number,pseudo:string,token:string}>>{
    console.log("°°°°°IN LOGIN SERVICE");
   
    //SEND DATA TO BACKEND
    const login_url = "http://localhost:3000/api/auth/login";

    return this.http.post<{userId:string,id_role:Number,pseudo:string,token:string}>(login_url,login_data,{observe :'response'}).pipe(
      // retry(2),
      
        tap(cont => console.log(`%cIN MESSAGE SERVICE SENDING LOG WITH POST ${cont}`,"color:blue")),
        tap(cont  =>{
            console.log("CONNNT IS");
             console.log(cont);
            //  localStorage.clear();
             localStorage.setItem('TOKEN', `${cont.body?.token}`);
             localStorage.setItem('id', `${cont.body?.userId}`);
             this.token = cont.body!.token;
             this.userId =cont.body!.userId;
             if(this.token !='AAAA'){
                this.isLogged = true;
             }
             this.idRole = cont.body!.id_role;
             this.pseudo = cont.body!.pseudo;
            //  this.setToken(cont.body!.token);
             console.log("TOOOOOKEN AND SUER ID")
             console.log(this.token);

        }),
        tap(contbis => {
            console.log("TA2 TOKEN iS");
            console.log(this.token);
        }),
        catchError(this.handleError2)
          // catchError(this.handleError<Login_model>('login'))

    )
}

  
                //REGISTRER
  registrer(user : userModel) : Observable<userModel>{
    console.log("°°°°°°° In REGISTRER SERVICE");
    //Take all REgistred value end send to backend Using Http post
    const signup_url ="http://localhost:3000/api/auth/signup";
    return this.http.post<userModel>(signup_url, user).pipe(
      tap((newUser : userModel) => this.log(`User correctly added >>> ${newUser.pseudo}`)),
      tap(cont => console.log(`%cIN MESSAGE SEVICE => SENDING REQUEST IN POST ${cont}`,"color:green")),
      // catchError(this.handleError<userModel>("IN Catch registrer error ")),
      catchError(this.handleError2),
    );

  }


                //USER INFO
  // getUsers(): Observable<HttpResponse<userInfo[]>>{
  getUsers(): Observable<userInfo[]>{
    //Get all fronted needed information from each user characteristic
    const user_info_url = "http://localhost:3000/api/auth/users_info";
    return this.http.get<userInfo[]>(user_info_url);
    // return this.http.get<userInfo[]>(user_info_url,{observe:'response'});
  }                


  checkIsLogged2(){
    const boolog = localStorage.getItem("TOKEN");
    // console.log(boolog);
    return boolog ? true : false;
  }

  getToken(): String {
    return this.token;
  }
  setToken(newToken:string):string{
    return this.token = newToken;
  }
  checkIsLogged(){
      return this.isLogged;
  }
  getUserId(){
      return this.userId ? this.userId :  this.userId2;
  }

  getUserId2(){
   this.usid = Number(localStorage.getItem("id"));
    return JSON.stringify(this.usid);
  }
  getUserRole(){
      return this.idRole;
  }
  getPseudo(){
      // return this.pseudo;
      this.pseudo = JSON.stringify(localStorage.getItem("pseudo"));
      return this.pseudo;
  }

  setLogged(){
    return this.isLogged = true;
  }
  setId(id : string){
    this.userId = id;
  }
  logout(){
    localStorage.clear();
    // window.NavigationPreloadManager
   
    console.log("LOGIn OUT");
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
        /**************
        ERROR HANDLING
        **************/
  private log(message : string){
    console.log("IN PRIVATE LOG");
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message} => ${error} \n`+ JSON.stringify(error));
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private handleError2(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



                                    //Manage ACCOUNT

   deleteUser(token:any, areaId:Number): Observable<HttpResponse<userModel>>{
    console.log("++++++++DELETING ACCOUNT");
    console.log(token);
    console.log("User Id");
    
    const request_url =`http://localhost:3000/api/auth/user/${areaId}`;

    return this.http.delete<userModel>(request_url,{observe:'response'}).pipe(
      tap(cont => {
        console.log("In DELETE TAP");
        console.log(cont);
      })
    )
   
    
   }

}

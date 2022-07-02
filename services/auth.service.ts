import { Injectable } from '@angular/core';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,of} from 'rxjs';

                //models
import { userModel } from 'models/user.model';
//ERoor Lib
import { catchError,map,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})




  //login

  //Log user


export class AuthService {

  constructor(private http: HttpClient) { }


  //methods

  login(){
    console.log("°°°°°IN LOGIN SERVICE");
  }

  registrer(user : userModel) : Observable<userModel>{
    console.log("°°°°°°° In REGISTRER SERVICE");
    //Take all REgistred value end send to backend Using Http post
    const signup_url ="http://localhost:3000/api/auth/signup";
    return this.http.post<userModel>(signup_url, user).pipe(
      tap((newUser : userModel) => this.log(`User correctly added >>> ${newUser.pseudo}`)),
      tap(cont => console.log(`%cIN MESSAGE SEVICE => SENDING REQUEST IN POST ${cont}`,"color:green")),
      catchError(this.handleError<userModel>("IN Catch registrer error ")),
    );

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
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}

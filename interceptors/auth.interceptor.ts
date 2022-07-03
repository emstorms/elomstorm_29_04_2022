import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { AuthTokenService } from "../services/auth_token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth:AuthService){}

    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        const headers = new HttpHeaders()
        // .append('Authorization',`Bearer ${this.auth.getToken()}`);
        // // const modifReq = req.clone({headers});
        // const modifReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + this.auth.getToken())});
        const authToken = this.auth.getToken();
        console.log("INTERCEPTORRRRRRR************");
        console.log(authToken);
        const modifReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
        
        return next.handle(modifReq);
        // return next.handle(req);
    }
}
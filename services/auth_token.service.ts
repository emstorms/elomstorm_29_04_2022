import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private token = 'MyFakeToken';
  
  getToken(): string {
    return this.token;
  }
  setToken(newToken:string):string{
    return this.token = newToken;
  }
}
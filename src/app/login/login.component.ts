import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AuthService } from 'services/auth.service';
import { Observable, tap ,EMPTY, catchError} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private auth: AuthService, private router :Router) { }

  //members
  login_form !:FormGroup;
  email !: FormControl;
  password !: FormControl;
  error_msg !: string;
  

  ngOnInit(): void {
    this.login_form = new FormGroup({
      email : new FormControl(''),
      password : new FormControl('')
    });
  }

  //methods

  onSubmit(){
    console.log("++++++++++++++");
    console.log("In LOGIN SUBMISSION");
    console.log(this.login_form.value);
    this.auth.login(this.login_form.value).pipe(
      tap(message => {
        console.log("IN PIPE");
        // console.log(message.is_valid_log);
        // console.log(typeof message);
        // console.log(message);
        // console.log();
        // const message2 = message;
        console.log(this.auth.getToken());
        console.log("PSEUDO IS");
        console.log(this.auth.getPseudo());
        
      }),/*
      catchError(error => {
        this.error_msg = JSON.stringify(error);
        console.log("--------ERRORR PIPE LOGIN");
        console.error(error);
        return EMPTY;
      })*/
    ).subscribe(response => {
      console.log("**********RESPONSE");
      console.log(response);
      console.log(response.status);
      if(response.status ===200){
        this.router.navigateByUrl('/member_area');
        console.log(JSON.stringify(localStorage));
        localStorage.clear();
        console.log(JSON.stringify(localStorage));
             localStorage.setItem('TOKEN', `${response.body?.token}`);
             localStorage.setItem('id', `${response.body?.userId}`);
             const theToken = localStorage.getItem('TOKEN');
             const theId = localStorage.getItem('id');
             if(theToken){
              console.log("+++++TOKEN Present");
              console.log(this.auth.getToken());
              this.auth.setToken(theToken);
              this.auth.setLogged();
             
              }
              if(theId){
                console.log("That ID");
                console.log(theId);
                this.auth.setId(theId);
              }
      }
    })
  }

}

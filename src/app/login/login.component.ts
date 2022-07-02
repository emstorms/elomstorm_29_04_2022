import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

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
  }

}

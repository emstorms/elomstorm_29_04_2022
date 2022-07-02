import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup,FormArray, NgForm ,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  //Members
  registration_form !: FormGroup;
  last_name !: FormControl;
  first_name !: FormControl;
  email !: FormControl;
  pseudo !:FormControl;
  password !:FormControl;
  password_bis !: FormControl;
  

  //Constructor

  constructor() { }


  //Methods

  ngOnInit(): void {
    //Initializating Form Group
         
    this.registration_form = new FormGroup({
      last_name : new FormControl(''),
      first_name :new FormControl(''),
      email : new FormControl(''),
      pseudo  :new FormControl(''),
      password : new FormControl(''),
      password_bis : new FormControl('')
      });
  }

  //Submission
  onSubmit(){
    console.log("ON SUBMIT BUTTOn CLICK, Calling service Submission");
    console.log(this.registration_form.value);
  }

}

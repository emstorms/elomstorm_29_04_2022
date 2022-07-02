import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup,FormArray, NgForm ,ReactiveFormsModule } from '@angular/forms';
import { userModel } from 'models/user.model';

    //Services
import { AuthService } from 'services/auth.service';


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

  constructor(private auth : AuthService) { }
  


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
  onRegister(){
    console.log("ON SUBMIT REgister BUTTOn CLICK, Calling service Submission");
    console.log(this.registration_form.value);
    const formValue = this.registration_form.value;
    
    
    // this.auth.registrer({formValue} as userModel)
    this.auth.registrer(formValue)
      .subscribe(member => {
        console.log("°° IN SUBSCRIPTION, show subs cont");
        console.log(member);

      });
    
  }

}

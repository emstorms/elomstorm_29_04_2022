import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'services/auth.service';
import { min, Observable,tap } from 'rxjs';
import { userInfo } from 'models/user.model';
import { Output } from '@angular/core';


@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.scss']
})
export class MemberAreaComponent implements OnInit {

  constructor(private auth : AuthService) { }

  //Members
  nom!:string;
  prenom!:string;
  pseudo!:string;
  email!:string;

  myInfo !: userInfo;
  usersInfo$ !: Observable<userInfo[]>
  // nom:string ="LENOM";
  // prenom:string="Prenom";
  // pseudo:string="pseudoman";
  // email:string="email@email";

  role_name !: string;

  @Output() isLog !: boolean;
  @Output() isLog_f = new EventEmitter<boolean>();

  ngOnInit(): void {
    console.log("CONF LOGIN");
    this.getMyInfo();
    console.log(this.auth.checkIsLogged());
    // if(Number(this.myInfo.id_role) == 1){
    //   this.role_name = "Utilisateur Normal";
    //   //user => 1
    //   //moderator => 500
    //   //admin => 2000
    // }else if(Number(this.myInfo.id_role) == 500){
    //   this.role_name = "Vous êtes un modérateur";
    // }else if(Number(this.myInfo.id_role) == 2000){
    //   this.role_name = "Vous êtes un Admin";
    // }


    console.log("IS logged");
    console.log(this.auth.s_islog);


  }
  isConnected(y_n :boolean){
    this.isLog_f.emit(y_n);
  }

  getMyInfo(){
     this.usersInfo$ = this.auth.getUsers().pipe(
      tap(cont => {
        console.log("ANSWER VALUES");
        console.log(cont);
       
      }))

      this.usersInfo$.subscribe(res => {
       
        if(localStorage.getItem('id')){
          console.log(typeof localStorage.getItem('id'));
          // const t = Number(localStorage.getItem('id'))
           const info = res.filter(user => user.id == Number(localStorage.getItem('id'))) ;
           console.log("info is");
           console.log(info[0]);
           this.myInfo = {...info[0]};
           if(Number(this.myInfo.id_role) == 1){
            this.role_name = "Utilisateur Normal";
            //user => 1
            //moderator => 500
            //admin => 2000
          }else if(Number(this.myInfo.id_role) == 500){
            this.role_name = "Vous êtes un modérateur";
          }else if(Number(this.myInfo.id_role) == 2000){
            this.role_name = "Vous êtes un Admin";
          }

          this.isLog = this.auth.checkIsLogged();
          console.log(this.isLog);
        }      
        
      });
   
    // console.log(this.usersInfo$);

  }

  getMyMessages(){

  }

}

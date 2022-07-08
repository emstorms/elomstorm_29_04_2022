import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'services/auth.service';
import { min, Observable,tap } from 'rxjs';
import { userInfo } from 'models/user.model';
import { Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.scss']
})
export class MemberAreaComponent implements OnInit {

  constructor(private auth : AuthService, private router : Router) { }

  //App message
  // app_message !:string;
  app_message !:string;

  //Members
  nom!:string;
  prenom!:string;
  pseudo!:string;
  email!:string;

  myInfo !: userInfo;
  usersInfo$ !: Observable<userInfo[]>
  role_name !: string;

  // @Output() isLog !: boolean;
  isLog !: boolean;
  @Output() isLog_f = new EventEmitter<boolean>();

  ngOnInit(): void {
    // console.log("CONF LOGIN");
     console.log("++++CHECK LOG WITH localstorage");
    // console.log(this.auth.checkIsLogged2());
    this.isLog = this.auth.checkIsLogged2();
    this.getMyInfo();
    // console.log(this.auth.checkIsLogged());
    // console.log("IS logged");
    // console.log(this.auth.s_islog);

   
    
  }
                   //Managing account
  deleteUser(){
    console.log("DELETE ACCOUNT");
    // const token = this.auth.getToken() ? this.auth.getToken : localStorage.getItem('TOKEN');
    const token =  localStorage.getItem('TOKEN');
    // console.log(token);
    console.log("++++++++++++Area Id");
    console.log(this.myInfo.id);
    if(typeof token !=='string'){
      // this.auth.deleteUser(token, this.myInfo.id);
      // this.auth.deleteUser(token, this.myInfo.id);
      // window.alert("Veuillez vous connecter avant poursuivre");
      console.log(token);
      //Emit message
      this.app_message = "Veuillez vous connecter avant de poursuivre";
      return;
    } 
                  // CONFIRM BEFORE DELETE


     const confirmation = prompt(`Tapez "Oui" si Vous souhaitez vraiment supprimer le compte de >${this.myInfo.pseudo}<`);
     const ouir = confirmation?.toLowerCase();
     if(ouir !== "oui" ){
        window.alert("---Abandon de la suppression du compte--");
        return;
     }

     
     window.alert("demande de suppression en cours");

 


     this.auth.deleteUser(token, this.myInfo.id).subscribe(response =>{
      console.log("RESPONSE MESSAGE IS");
      console.log(response.status);
      if(response.status == 200){
        this.app_message = "Le compte a bien été Supprimé, vous allez être rediriger A la page d'accueil dans $setTimeout then navigateByUrl";
        window.alert("Le compte a bien été Supprimé, vous allez être rediriger A la page d'accueil");
        this.router.navigateByUrl('/logout_page');
      }
     });

  }




  isConnected(y_n :boolean){
    this.isLog_f.emit(y_n);
  }

  getMyInfo(){
     this.usersInfo$ = this.auth.getUsers().pipe(
      tap(cont => {
        // console.log("ANSWER VALUES");
        // console.log(cont);
       
      }))

      this.usersInfo$.subscribe(res => {
       
        if(localStorage.getItem('id')){
          // console.log(typeof localStorage.getItem('id'));
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

          // this.isLog = this.auth.checkIsLogged();
          this.isLog = this.auth.checkIsLogged2();
          console.log(this.isLog);
        }      
        
      });
   
    // console.log(this.usersInfo$);

  }

  getMyMessages(){

  }

}

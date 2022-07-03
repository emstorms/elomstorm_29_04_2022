import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLog !: boolean;
  

  constructor(private auth: AuthService, private router : Router) {
    
   }

   

  ngOnInit(): void {
    
    this.isLog = this.auth.checkIsLogged();
    //  this.logout();
     
    //  this.router.navigateByUrl('welcome');
    
    
  }

   logout(){
    localStorage.clear();
     this.router.navigateByUrl('logout_page');
  }

}

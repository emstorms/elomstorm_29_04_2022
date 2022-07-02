import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.scss']
})
export class MemberAreaComponent implements OnInit {

  constructor() { }

  //Members
  nom:string ="LENOM";
  prenom:string="Prenom";
  pseudo:string="pseudoman";
  email:string="email@email";

  ngOnInit(): void {
    console.log("CONF LOGIN");
  }

}

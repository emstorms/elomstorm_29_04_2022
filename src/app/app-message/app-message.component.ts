import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-message',
  templateUrl: './app-message.component.html',
  styleUrls: ['./app-message.component.scss']
})
export class AppMessageComponent implements OnInit {

  @Input() message!: string;

  constructor() { }

  ngOnInit(): void {
  }

}

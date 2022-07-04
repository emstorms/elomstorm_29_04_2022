import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Article_message } from 'models/article-message.model';
import { Answer_message } from 'models/article_answer.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  constructor() { }

  userId !: Number;
  idRole !:Number;
    //is Owner contain the check of article Owner ID with userId 
  isOwner : boolean = false;
  //Parent var

  write_form_g !: FormGroup;
  title!: FormControl;
  message_content !: FormControl;
  image_url ?: FormControl;
  image_alt ?:FormControl;
  img_file !: File;
  image_file !: File;
   containFile :any = new FormData();
  annonce_check ?: FormControl;
  is_annonce ?: boolean = true;
  imagePreview !: string;
  article_model !: Article_message;
  isLogged :boolean = false;
  @Input() count_click !:number;

  // @Input() answerModel !: Answer_message;
  @Input() answerModel !: Answer_message;

  ngOnInit(): void {
    console.log(this.answerModel);
  }

  getAnswerId(){
    console.log("+++++++++ANSWER ID IS");
    console.log(this.answerModel);
  }


}

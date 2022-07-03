import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl } from '@angular/forms';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  //Members
  write_form_g !: FormGroup;
  title!: FormControl;
  message_content !: FormControl;
  image_url ?: FormControl;
  image_alt ?:FormControl;
  annonce_check ?: FormControl;
  is_annonce ?: boolean = true;

  // article_model !: Article_message;
  isLogged :boolean = false;


  constructor(private auth : AuthService) { }


  //Methods 

  ngOnInit(): void {
    this.write_form_g = new FormGroup({
      title : new FormControl(''),
      message_content : new FormControl(''),
      image_url : new FormControl(''),
      image_alt : new FormControl(''),
      annonce_check : new FormControl('')
    })
    console.log(this.auth.checkIsLogged());

  }

  onPoster(){
    console.log("++POSTER CLICKED++");
    console.log(this.auth.checkIsLogged());
  }



}

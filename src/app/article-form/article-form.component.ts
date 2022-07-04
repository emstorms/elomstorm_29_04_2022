import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl } from '@angular/forms';
import { AuthService } from 'services/auth.service';
import { MessageService } from 'services/message.service';

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


  // imagePreview!: string;
  imagePreview!: any;

  constructor(private auth : AuthService,private messageService :MessageService) { }


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
  showPreview(event : Event){
    console.log("EVENT");
    const file =(event.target as HTMLInputElement).files![0];
    this.write_form_g.get('image_url')!.setValue(file);
    // this.message_form_group.get('image_url')!.setValue(this.myFile);
    this.write_form_g.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=> {
     this.imagePreview = reader.result as string;
    }

  }

  imgpreviewsrc(src :string){
    const reader = new FileReader();
    reader.onload = ()=> {
      return reader.result as string;
    }
    // cont src_ = ()
  }

  onPoster(){
    console.log("++POSTER CLICKED++");
    console.log(this.auth.checkIsLogged2());
    console.log("userInfo");
    console.log(localStorage.getItem('id'));
    console.log(this.write_form_g.value);
    if(this.write_form_g.get('image_url') != null){
      //Contain FIle
      this.imagePreview = this.imgpreviewsrc(this.write_form_g.value.image_url);
      // const file = this.imgpreviewsrc(this.write_form_g.get('image_url'));
     
      this.messageService.create_article(this.write_form_g.value).subscribe(response => {
        console.log("+++CREATE MESSAGE RESPONSE");
        console.log(response);
      });
    }else{
      console.log("NO FILE");
      this.messageService.create_article(this.write_form_g.value).subscribe(response => {
        console.log("+++CREATE MESSAGE RESPONSE");
        console.log(response);
      });
    }
    
  }



}

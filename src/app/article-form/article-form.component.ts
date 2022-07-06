import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'models/article-message.model';
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

  message !:Message;
  // imagePreview!: string;
  imagePreview !: any;
  imageBase64: string = '';

  constructor(private auth : AuthService,private messageService :MessageService, private router: Router) { }


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

  testbase64(event: any) {
    console.log("++++Change++");
    // if(event.target.files && event.target.files[0])
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image(); 
      image.src = e.target.result;
      image.onload = rs => {
        const imageBase64Path = e.target.result;
        this.imageBase64 = imageBase64Path;
        console.log(imageBase64Path);
      }
    }
    reader.readAsDataURL(event.target.files[0]);

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
    
    console.log(this.write_form_g.value);
    if(this.write_form_g.get('image_url') != null){
      //Contain FIle
      this.imagePreview = this.imgpreviewsrc(this.write_form_g.value.image_url);
      // const file = this.imgpreviewsrc(this.write_form_g.get('image_url'));
     this.message = {
        ...this.write_form_g.value
     }
     this.message.image_url  = this.imageBase64;
     
     console.log(this.message.image_url);
      this.messageService.create_article(this.message).subscribe(response => {
        console.log("+++CREATE MESSAGE RESPONSE");
        // console.log(response);
        if(response.status == 200){
          window.alert("Votre message a bien été enregistré");
          this.router.navigateByUrl('/articles');
        }else{
          window.alert("Malheureusement, votre message n'a pu être enregistrer, veuiller réessayer");
        }
      });
    }else{
      console.log("NO FILE");
      this.messageService.create_article(this.write_form_g.value).subscribe(response => {
        console.log("+++CREATE MESSAGE RESPONSE");
        // console.log(response);
      });
    }
    
  }



}

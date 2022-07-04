import { Component, OnInit } from '@angular/core';
import { Article_message } from 'models/article-message.model';
import { Input,Output } from '@angular/core';
import { FormControl, ReactiveFormsModule,FormGroup,FormBuilder } from '@angular/forms';
import { Observable ,map,tap} from 'rxjs';
import { Answer, Answer_message } from 'models/article_answer.model';
import { EventEmitter } from '@angular/core';
import { MessageService } from 'services/message.service';
import { AuthService } from 'services/auth.service';
import { ArticleComponent } from '../article/article.component';
import { ActivatedRoute } from '@angular/router';
// import {map} from '@angular/operator';



@Component({
  selector: 'app-creation-message',
  templateUrl: './creation-message.component.html',
  styleUrls: ['./creation-message.component.scss']
})
export class CreationMessageComponent implements OnInit {

  @Input() parentArticle !: Article_message;
  @Input () parentId !: number;
  answer_button_text !:string;
  cancel_fired !: boolean;
  cancel_button !: boolean;
  click_fired !: boolean;
  @Input() type_article_preview !: ArticleComponent;
  @Input() create_message_module !: CreationMessageComponent;
  @Input() untexte !: string;
  @Output() close_answer_form = new EventEmitter<string>();



     message_form_group !: FormGroup;
  //Observable sur la form afin de retourner un tablau
    observe_form$ !: Observable<Answer_message>;
    observe_poster$ !: Observable<Answer_message>;
    message_form !: FormControl;
    answer_model !: Answer_message;
    pseudo !:String;
    //FIle image
    myFile !: File;
    //Observable sur la form afin de retourner un tablau
    imagePreview!: string;

    constructor(private formBuilder: FormBuilder, private message_service : MessageService,private auth : AuthService, private route :ActivatedRoute) { }


    ngOnInit(): void {
      const idPar = this.route.snapshot.paramMap;
      this.parentId = Number(idPar.get('id'));
      console.log("WHERE IS THA PARENT ID");
      console.log(this.parentId);
      this.pseudo = this.auth.getPseudo();
      //adding form control that will take binding template Syntax  of [formControl]with 
    this.message_form = new FormControl('');
    this.message_form_group = new FormGroup({
      title : new FormControl(''),
      message_content : new FormControl(''),
      image_url : new FormControl('')
  
    });
  
  
    //UPDating Observable to Use Async
    this.observe_form$ = this.message_form_group.valueChanges.pipe(
      map(form_value => ({
        ...form_value,
          
        
        // image_url : imgpreviewsrc(this.message_form_group.ti),
        
      })),
      tap(_ => {
        // console.log("TAP FORM Value");
        // console.log(_);
        // console.log(this.auth.getUserId2());
        // console.log(this.parentId);
        // this.answer_model.answer_owner_id = parseInt(this.auth.getUserId());
        // this.answer_model.article_id = this.parentId
        // console.log("ANSWER MODEL ??");
        // console.log(_);
      })
    );
      this.answer_button_text ="Default Button Text";
      this.observe_form$.subscribe();
      
 
    }


  //image preview
  imgpreviewsrc(src :string){
    const reader = new FileReader();
    reader.onload = ()=> {
      return reader.result as string;
    }
    // cont src_ = ()
  }

  onRepondre(){
    console.log("ON REPOND au parent id");
    console.log(this.parentId);
    this.answer_model = new Answer_message();
    // this.message_service.answer_article(this.message_form_group.value,this.myFile);
    // this.answer_model.answer_owner_id = Number(`${(this.auth.getUserId2())}`);
    this.answer_model.article_id = `${this.parentId}`;
    this.answer_model.title = this.message_form_group.value.title;
    this.answer_model.message_content = this.message_form_group.value.message_content;
    this.answer_model.image_url = JSON.stringify( this.message_form_group.value.image_url);
    this.answer_model.image_url_file = this.message_form_group.value.image_url;
    this.answer_model.image_alt = "DEFAULT ALT";
    // this.answer_model.ownerPseudo = this.auth.getPseudo();
    this.answer_model.ownerPseudo = this.pseudo;
    // this.answer_model.image_url = this.imagePreview;
    /**
     *  // this.answer_model.image_url = this.imagePreview;
     * IMGE BELOWWWW =>const options = {headers: {'Content-Type': 'application/json'}};
     * PayloadTooLargeError: request entity too large
     */
    this.answer_model.image_alt = this.message_form_group.value.image_alt;
    // this.answer_model.answer_owner_id = this.message_form_group.value
    console.log("ANSWER MODEL ??");
    // console.log(this.auth.getUserId2());
    // const ido =Number(`${(this.auth.getUserId2())}`);
    // console.log(ido);
    // this.answer_model.answer_owner_id = ;
    console.log(this.answer_model);
      this.observe_poster$ = this.message_service.answer_article(this.answer_model,this.imagePreview);
      this.observe_poster$.subscribe();
  }

  showPreview(event : Event){
    const file =(event.target as HTMLInputElement).files![0];
    this.message_form_group.get('image_url')!.setValue(file);
    // this.message_form_group.get('image_url')!.setValue(this.myFile);
    this.message_form_group.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=> {
     this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  set_close_state(value:string){
    this.close_answer_form.emit(value);
    console.log("IN SET close state");
    console.log(value);
    // this.type_article_preview.to_close_answer_form();
    // this.type_article_preview.creation_message.click_fired =false;
    
  }
  show_form_content(){
    console.log(this.message_form_group.value);
    console.log("PARENT ID");
    console.log(this.parentId);
    

  }
    
  }    
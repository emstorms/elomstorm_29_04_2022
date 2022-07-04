import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'models/article-message.model';
import { MessageService } from 'services/message.service';
import { Observable,switchMap,tap,concatMap } from 'rxjs';
import { Article_message } from 'models/article-message.model';
import { CreationMessageComponent } from '../creation-message/creation-message.component';
import { Input } from '@angular/core';
import { Answer, Answer_message } from 'models/article_answer.model';
import { AuthService } from 'services/auth.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article !: Message;
  article$ !:Observable<Message>;
  @Input () articleModel !: Article_message;
  
  @Input() Message_form !: CreationMessageComponent;
  answer_button_text !: string;
  meParent : ArticleComponent = this;
  is_shown_answer_form !: boolean;
  is_shown_answer_list :boolean = false;
  creation_message !: CreationMessageComponent;
  answerModel !: Answer;
        /*******
         * 
         * PERMISSION Varaibles
         * 
         */
  userId !: Number;
  idRole !:Number;
    //is Owner contain the check of article Owner ID with userId 
  isOwner !: boolean;
  parentId !: number;
  list_answer$ !: Observable<Answer_message[]>

  count_click : number = 0;
  test_message :string = "testmessage est là";
  nb_like :Number = 0;
  nb_dislike :Number = 0;



  constructor(private route : ActivatedRoute, private messageService : MessageService, private auth : AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    const artId = +this.route.snapshot.params['id'];
    this.articleModel = new Article_message();
    // console.log("+++++++++SNAP ");
    console.log(artId);
    // this.article$ = this.messageService.getArticleById(artId);
    this.list_answer$ = this.messageService.getArticleById(artId).pipe(
      tap(cont => {
        console.log("SETTING LOCAL STORAGE");
        console.log(cont);
        this.article = {...cont};
        this.articleModel = {...cont};
        console.log("Model and article");
        console.log(this.article);
        console.log(this.articleModel);
      }),
      concatMap(singleArticle => this.messageService.getAnswersById(artId).pipe(
      // switchMap(singleArticle => this.messageService.getAnswersById(artId).pipe(
        tap(cont2 => {
          console.log("AFTER SWITCH MAP+++++++");
          console.log(cont2);
        })
      )
     
    ));
    // this.article$.subscribe(ee=>{
    this.list_answer$.subscribe(ee=>{
      console.log("SUBSCRIBE+++++++");
    });

/*    
    this.article$.subscribe(rep =>{
      // console.log("REEEEEEP");
      // console.log(typeof rep);
      this.article = {...rep};
      console.log("THIS ARTICLE");
      console.log(this.article);
      this.isOwner = this.checkIsOwner();
      this.articleModel.id = this.article.id;
      this.parentId = artId;
      // this.list_answer$ = this.messageService.getAnswersById(this.parentId);
      this.idRole =1001;
        console.log(this.article);
        // this.idRole = this.auth.getUserRole();
        this.idRole = Number(localStorage.getItem('role'));
        console.log("ROLE USER");
        console.log(this.idRole);
        this.is_shown_answer_form = false;
        if(this.article){
          console.log("THERE IS ARTICLE");
          // this.list_answer$ = this.messageService.getAnswersById(this.parentId).pipe(
          //   tap(cont => {
          //     console.log("Cont is ");
          //   }));
          //   this.list_answer$.subscribe();
            

          
        }else{
          console.log("NO article");
          
        }

    
    });

*/


              //CHECKING User GRANT

   
   
            //LOOking for Answer When article MOdel got ID
/*            
        
    if(typeof this.articleModel.id == 'number') {
    
        console.log("ARTICLE MODEL IS NUMBER");
        this.parentId = this.articleModel.id;
         //LIST OF ANSWER
         this.list_answer$ = this.messageService.getAnswersById(this.parentId).pipe(
          tap(cont => {
        
        if(cont.length > 0){
          console.log("++++++ARTICLE Preview list Answer IBS");
          console.log(cont);
        } else{
          console.log("WHAT IS CONT+++++++++++");
        }
      })
    )

    
    this.list_answer$.subscribe(res => {
      tap(_ => {
        console.log("LLISTE DES REPONSES");
        console.log(_);
      })
    });
    // console.log("LIST REPONSE +++++++ LENGTH");
    // console.log(this.list_answer$);
    
    }else{
        console.log(typeof this.articleModel.id);
    }
   */

  }

  checkIsOwner(){
    // return this.isOwner = (this.articleModel.article_owner_id == parseInt(this.auth.getUserId2()));
    return this.isOwner = (this.article.article_owner_id == parseInt(this.auth.getUserId2()));
    
  }
  
  onCreateMessage(bttn_type: string):void{

    // console.log("Trying to createCALL Create Message");
    // console.log(">>>>>>>This test message");
    // console.log(this.test_message);
  }

  // to_show_answer_form(mybool:'true'|'false'){
    to_show_answer_form(){
      // console.log("articleé");
      this.is_shown_answer_form =true;
      // console.log(this.articleModel);
      
      // mybool ? this.is_shown_answer_form = false: this.is_shown_answer_form =true;
    }
    to_close_answer_form(ev :string){
      this.is_shown_answer_form = false;
    }

    onDeleteMessage(){
      console.log("IN DELETE MESSAGE");
      const id_message = this.articleModel.id;
      this.messageService.delete_article(this.articleModel.id!).pipe(
        tap(res =>{
          console.log("+++++++++++DELETE TAP");
          // console.log(res);
          window.location.reload();
        })
      ).subscribe();
    }

    to_open_close_answer(){
      //Switching close and / Open" Form
      ++ this.count_click;
      if(this.count_click %2){
        this.is_shown_answer_list = true;
      }else{
        this.is_shown_answer_list = false;
      }
  
    }
  

}

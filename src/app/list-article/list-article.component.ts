import { Component,  OnInit } from '@angular/core';
import { Message } from 'models/article-message.model';
import { AuthService } from 'services/auth.service';
import { Observable, tap,concatMap, switchMap } from 'rxjs';
import { MessageService } from 'services/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {
  list_article$ !: Observable<Message[]>;
  list2 !: Message[];

  isLogged !: boolean;

  article !: Message;

  constructor(private auth : AuthService, private message_service: MessageService) { }

  ngOnInit(): void {
    console.log("IN ONINIT++++++++++++");
    this.isLogged = this.auth.checkIsLogged2();
    this.list_article$ = this.message_service.getArticles_v2().pipe(
      tap(tab => {
        // console.log("+++In TAP+++ ");
        // console.log(tab);
        // console.log(typeof tab);
        // console.log(JSON.stringify(tab));
        this.list2 = tab;
        

         //fill article
        this.article = {...this.list2[0]};
        // console.log("ARTICLE++++");
        // console.log(this.article);
      }),
     
      );

      this.list_article$.subscribe( sub => {
        console.log("IN SUBSC CHECK is logged");
        console.log(this.auth.checkIsLogged2());
      });

     
  }

  

}

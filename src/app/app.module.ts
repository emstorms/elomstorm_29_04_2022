import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ArticleComponent } from './article/article.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { MemberAreaComponent } from './member-area/member-area.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorProvider } from 'interceptors';
import { AppMessageComponent } from './app-message/app-message.component';
import { AuthGuard } from 'services/auth-guard.service';
import { ListArticleComponent } from './list-article/list-article.component';
import { RouterModule } from '@angular/router';
import { CreationMessageComponent } from './creation-message/creation-message.component';
import { AnswerComponent } from './answer/answer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticleComponent,
    RegistrationComponent,
    LoginComponent,
    ArticleFormComponent,
    MemberAreaComponent,
    LogoutPageComponent,
    WelcomePageComponent,
    AppMessageComponent,
    ListArticleComponent,
    CreationMessageComponent,
    AnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      // {path:'', component:ListArticleComponent},
      // {path:'articles/:articleId'},
    ])

  ],
  providers: [HttpInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

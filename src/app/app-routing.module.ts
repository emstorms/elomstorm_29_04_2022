import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MemberAreaComponent } from './member-area/member-area.component';
import { AuthGuard } from 'services/auth-guard.service';
import { ListArticleComponent } from './list-article/list-article.component';
import { ArticleComponent } from './article/article.component';


const routes: Routes = [
  {path: 'registrer', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  // {path: 'article_form', component: ArticleFormComponent ,canActivate: [AuthGuard]},
  {path: 'article_form', component: ArticleFormComponent,canActivate: [AuthGuard] },
  {path:'logout_page', component : LogoutPageComponent},
  {path:'welcome', component : WelcomePageComponent,},
  {path: 'member_area', component: MemberAreaComponent},
  {path: 'articles', component : ListArticleComponent,canActivate: [AuthGuard]},
  {path : 'articles/:id', component : ArticleComponent,canActivate: [AuthGuard]},
  //When empty route Or bad input send redirect 
  {path :'',redirectTo:'welcome',pathMatch:'full'},
  // {path :'**',redirectTo:'welcome',pathMatch:'full'}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticleComponent,
    RegistrationComponent,
    LoginComponent,
    ArticleFormComponent,
    MemberAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

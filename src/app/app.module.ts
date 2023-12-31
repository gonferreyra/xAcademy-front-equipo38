import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './core/http/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AngularResizeEventModule } from 'angular-resize-event';
import { FooterModule } from './modules/home/footer/footer.module';


@NgModule({
  declarations: [
    AppComponent,NavbarComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularResizeEventModule,
    FooterModule,
   ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
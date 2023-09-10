import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login-page/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    LoginComponent
  ],
})
export class LoginModule { }

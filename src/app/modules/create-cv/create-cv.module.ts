import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCvRoutingModule } from './create-cv-routing.module';
import { CreatePageComponent } from './create-page/create-page.component';
import { CertificatesFormComponent } from './certificates-form/certificates-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CreatePageComponent,
    CertificatesFormComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    CreateCvRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class CreateCvModule { }

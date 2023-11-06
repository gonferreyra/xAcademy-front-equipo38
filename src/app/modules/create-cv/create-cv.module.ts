import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCvRoutingModule } from './create-cv-routing.module';
import { CreatePageComponent } from './create-page/create-page.component';
import { CertificatesFormComponent } from './certificates-form/certificates-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExperienceFormComponent } from './experience-form/experience-form.component';
import { EducationFormComponent } from './education-form/education-form.component';
import { PersonFormComponent } from './person-form/person-form.component';


@NgModule({
  declarations: [
    CreatePageComponent,
    CertificatesFormComponent,
    SidebarComponent,
    ExperienceFormComponent,
    EducationFormComponent,
    PersonFormComponent,
  ],
  imports: [
    CommonModule,
    CreateCvRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class CreateCvModule { }

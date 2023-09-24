import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './create-page/create-page.component';
import { CertificatesFormComponent } from './certificates-form/certificates-form.component';
import { ExperienceFormComponent } from './experience-form/experience-form.component';
import { EducationFormComponent } from './education-form/education-form.component';

const routes: Routes = [{
  path: '',
  component: CreatePageComponent,
  children: [
    { path: 'certificates', 
    component: CertificatesFormComponent},
    { path: 'experience', 
    component: ExperienceFormComponent},
    { path: 'education', 
    component: EducationFormComponent}
    ]
    
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCvRoutingModule { }

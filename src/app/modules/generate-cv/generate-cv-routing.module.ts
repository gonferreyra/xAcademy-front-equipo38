import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateCvComponent } from './generate-cv/generate-cv.component';

const routes: Routes = [
  { path: '', 
    component: GenerateCvComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateCvRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{CursosPageComponent} from './cursos-page/cursos-page.component';
const routes: Routes = [
  {path: '',component:CursosPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }

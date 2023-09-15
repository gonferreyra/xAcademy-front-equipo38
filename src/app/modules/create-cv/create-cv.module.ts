import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCvRoutingModule } from './create-cv-routing.module';
import { CreatePageComponent } from './create-page/create-page.component';


@NgModule({
  declarations: [
    CreatePageComponent
  ],
  imports: [
    CommonModule,
    CreateCvRoutingModule
  ],
})
export class CreateCvModule { }

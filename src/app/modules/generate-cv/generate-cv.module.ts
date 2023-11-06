import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateCvRoutingModule } from './generate-cv-routing.module';
import { GenerateCvComponent } from './generate-cv/generate-cv.component';


@NgModule({
  declarations: [
    GenerateCvComponent
  ],
  imports: [
    CommonModule,
    GenerateCvRoutingModule
  ]
})
export class GenerateCvModule { }

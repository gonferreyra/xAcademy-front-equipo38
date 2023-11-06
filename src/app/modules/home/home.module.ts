import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SliderComponent } from './slider/slider.component';
import { HomeTextComponent } from './home-text/home-text.component';




@NgModule({
  declarations: [
    HomePageComponent,
    SliderComponent,
    HomeTextComponent,
  
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, 
  ]
})
export class HomeModule { }

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slide:number = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

  updateSlide(newSlide: number) {
    this.slide = newSlide;
  }
}

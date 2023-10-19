import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slide: number = 1; // Índice del slide actual
  totalSlides: number = 3; // Número total de slides

  constructor() {}

  ngOnInit() {
    // Iniciar la automatización del slider
    this.startAutoSlide();
  }

  // Función para actualizar el slide
  updateSlide(newSlide: number) {
    this.slide = newSlide;
  }

  // Función para cambiar automáticamente el slide
  startAutoSlide() {
    setInterval(() => {
      this.slide = (this.slide % this.totalSlides) + 1;
    }, 3000); // Cambia de slide cada 3 segundos (ajusta el intervalo según tus preferencias)
  }
}

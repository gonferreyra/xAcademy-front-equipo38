import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  images: string[] = [
    'https://cvmkr.com/images/slides/1.png',
    'https://cvmkr.com/images/slides/2.png',
    'https://cvmkr.com/images/slides/3.png'
  ];

  constructor() { }

  ngOnInit(): void {
  }
}

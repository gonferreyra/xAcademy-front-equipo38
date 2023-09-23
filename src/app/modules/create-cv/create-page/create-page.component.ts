import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  name:string | null | undefined = "";
  constructor() { }

  ngOnInit(): void {
    this.name = localStorage.getItem("Name");   //descomentar para usar con TOKEN
  }

}

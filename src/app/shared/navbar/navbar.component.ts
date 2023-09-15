import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  closed:boolean = false;
  disable:boolean = false;
  menu:string = "menu";
  constructor() { }

  ngOnInit(): void {
  }

  onResized(event: ResizedEvent) {
  
    if(event.newRect.width > 750){
      this.closed = true;
    }
    else{
      if(this.closed){
        this.menu = "cross"
      }
      else{
        this.menu = "menu"
      }
    }
  }
  change(){
    this.closed = !this.closed;
    


  }
}

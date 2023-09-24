import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  name:string = "menu";
  statLog:boolean = true;
  constructor(private router: Router) { 

  }

  ngOnInit(): void {
    const name = localStorage.getItem("Name");
    if( name != null){
      this.statLog = false;
      this.name= name;
    }
    else{
      this.statLog = true;
    }

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
  logout(){
    localStorage.removeItem("Token");
    localStorage.removeItem("Name");
    localStorage.removeItem("id");
    this.router.navigate(['/','home']);
   
  }
}

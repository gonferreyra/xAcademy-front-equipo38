import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  token:string = localStorage.getItem("Token")!;
  
  constructor(public api : ApiService,private router: Router) {}


  ngOnInit(): void {
    if(localStorage.getItem("Token")){
    this.api.setHeader("Authorization","Bearer "+this.token);
    this.api.get("profile").subscribe({
           next: (data:any) =>{
            console.log(data) ;
          },
           error: err =>{
            localStorage.clear();
            this.router.navigate(['/','login']) 
          
          },
      });
    }
  }




}

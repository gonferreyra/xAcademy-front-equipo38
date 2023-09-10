import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthJwtGuard implements CanActivate {

  constructor(public api : ApiService, private router: Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem("Token");
      if(!token){
        this.router.navigate(['/','login']);
      }
      return true;
      
      
  }
  
}

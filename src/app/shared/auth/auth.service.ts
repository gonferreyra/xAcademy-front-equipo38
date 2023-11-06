import { Injectable } from '@angular/core';
import { Subject, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  Authenticated(): boolean {
    throw new Error('Method not implemented.');
  }
  authenticated= new Subject<boolean>();
  isAuthenticated: any;
  
  userLoggedOut() {
    this.authenticated.next(false);

  } 
  userLoggedIn() {
    this.authenticated.next(true);
  } 
  
  constructor() { }
}

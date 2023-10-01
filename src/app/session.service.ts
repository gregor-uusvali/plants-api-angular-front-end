import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  currentUserId: number = 0;
  sessionToken: string = "";
  isAuthenticated: boolean = false;
  firstName: string = "";
  lastName: string = "";

  setSession(userId: number, token: string, isAuth: boolean, fName: string, lName: string){
    this.currentUserId = userId
    this.sessionToken = token
    this.isAuthenticated = isAuth
    this.firstName = fName
    this.lastName = lName
  }
}
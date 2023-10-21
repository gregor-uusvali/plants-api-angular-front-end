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
  accessLevel: number = 2;
  image: String | null = null;
  createdAt: Date = new Date();


  async getCurrentUserId(): Promise<number> {
    return this.currentUserId;
  }

  setSession(userId: number, token: string, isAuth: boolean, fName: string, lName: string, accessLvl: number, img: String, createdAt: Date){
    this.currentUserId = userId
    this.sessionToken = token
    this.isAuthenticated = isAuth
    this.firstName = fName
    this.lastName = lName
    this.accessLevel = accessLvl
    this.image = img
    this. createdAt = createdAt
  }
}
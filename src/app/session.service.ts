import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  currentUserId: number = 0;
  sessionToken: string = '';
  isAuthenticated: boolean = false;
  firstName: string = '';
  lastName: string = '';
  accessLevel: number = 2;
  image: string | null = null;
  createdAt: Date = new Date();
  email: string = '';

  async getCurrentUserId(): Promise<number> {
    return this.currentUserId;
  }

  setSession(
    userId: number,
    token: string,
    isAuth: boolean,
    fName: string,
    lName: string,
    accessLvl: number,
    img: string,
    createdAt: Date,
    email: string
  ) {
    this.currentUserId = userId;
    this.sessionToken = token;
    this.isAuthenticated = isAuth;
    this.firstName = fName;
    this.lastName = lName;
    this.accessLevel = accessLvl;
    this.image = img;
    this.createdAt = createdAt;
    this.email = email;
  }

  logOut = () => {
    this.http.delete('http://localhost:8080/api/v1/logout', {
      body: this.sessionToken,
    });
    this.setSession(0, '', false, '', '', 2, '', new Date(), '');
    this.cookieService.delete('session_token');
    this.router.navigate(['/']);
  };

  fetchUserByCookie = (cookie: string) => {
    this.http
      .get<any>(
        `http://localhost:8080/api/v1/profile/0?sessionToken=${cookie}`,
        {
          withCredentials: true,
        }
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.setSession(
            data.id,
            cookie,
            true,
            data.firstName,
            data.lastName,
            data.accessLevel,
            data.image,
            data.createdAt,
            data.email
          );
        },
        error: (error) => {
          console.log(error);
        },
      });
  };
}

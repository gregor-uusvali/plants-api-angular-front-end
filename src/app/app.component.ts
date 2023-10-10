import { Component } from '@angular/core';
import { AlertService } from './alert.service';
import { SessionService } from './session.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Water a palnt 🪴';
  constructor(
    public  alertService: AlertService,
    public sessionService: SessionService,
    public cookieService: CookieService,
    public router: Router
  ) {}
  ngOnInit(){

    this.alertService.setAlert('', '', "hidden")
    this.isLoggedIn()

  }

  logOut = () => {
    fetch('http://localhost:8080/api/v1/logout', {
      method: "DELETE",
      body: this.sessionService.sessionToken
    })
    this.sessionService.setSession(0, "", false, "", "")
    this.cookieService.delete('session_token');
    this.router.navigate(['/']);
  }
  fetchUserByCookie = (cookie: string) => {
    fetch(`http://localhost:8080/api/v1/profile/0?sessionToken=${cookie}`, {
      method: "GET",
      credentials: "include"
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          this.sessionService.setSession(
            data.id,
            cookie,
            true,
            data.firstName,
            data.lastName
            )
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  isLoggedIn = () => {
    const cookie = this.cookieService.get("session_token");
    if (cookie) {
      this.sessionService.sessionToken = cookie
      this.sessionService.isAuthenticated = true
      this.fetchUserByCookie(cookie)
    } else {
      console.log("Not logged in")
    }
  }
}

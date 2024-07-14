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
    public alertService: AlertService,
    public sessionService: SessionService,
    public cookieService: CookieService,
    public router: Router
  ) { }

  ngOnInit() {
    this.alertService.setAlert('', '', "hidden");
    this.isLoggedIn();
  }

  logOut = () => {
    this.sessionService.logOut();
  }

  isLoggedIn = () => {
    const cookie = this.cookieService.getAll()["session_token"];

    if (cookie) {
      this.sessionService.sessionToken = cookie;
      this.sessionService.isAuthenticated = true;
      this.sessionService.fetchUserByCookie(cookie);
    } else {
      console.log("Not logged in");
    }
  }
}

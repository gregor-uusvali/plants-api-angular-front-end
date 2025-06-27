import { Component, inject } from '@angular/core';
import { AlertService } from './alert.service';
import { SessionService } from './session.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
  })
export class AppComponent {
  title = 'Water a palnt 🪴';
  cookieService = inject(CookieService);
  router = inject(Router);	
  alertService = inject(AlertService);
  sessionService = inject(SessionService);

  constructor() { }

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

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from '../alert.service';
import { SessionService } from '../session.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private cookieService: CookieService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  addInfo = (str: string, type: string) => {
    this.alertService.setAlert(str, type, "alert-banner")
    setTimeout(() => {
      this.alertService.setAlert(str, type, "hidden")
    }, 4000)
  }

  onSubmit(e: any): void {
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    e.preventDefault()
    if (email !== '' || password !== '') {
      const payload = {
        email: email,
        password: password
      };

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      };

      fetch('http://localhost:8080/api/v1/login', requestOptions)
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            this.cookieService.set('session_token', data.sessionToken);
            this.sessionService.setSession(
              parseInt(data.userId, 10),
              data.sessionToken,
              true,
              data.firstName,
              data.lastName
            )
            this.router.navigate(['/']);
          } else {
            const errorText = await response.text();
            this.addInfo(errorText, 'error');
          }
        })
        .catch(error => {
          console.log(error);
          this.addInfo('An error occurred', 'error');
        });
      this.addInfo('Login successful!', 'success')
    
    } else {
      this.addInfo('No empty fields', 'error');
    }
    console.log('Your order has been submitted', this.loginForm.value);
  }
}

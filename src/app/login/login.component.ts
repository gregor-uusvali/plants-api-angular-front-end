import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



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
  ) {}

  onSubmit(): void {
    // Process checkout data here
    console.log('Your order has been submitted', this.loginForm.value);
  }
}
// export class LoginComponent {
//   email = '';
//   password = '';

//   constructor(
//     // private outletContextService: OutletContextService, // Replace with your service
//     private router: Router,
//     private cookieService: CookieService,
//   ) {}

//   addInfo(str: string, type: string): void {
//     // Implement your addInfo logic here
//   }

//   handleSubmit(event: Event): void {
//     event.preventDefault();
//     if (this.email !== '' || this.password !== '') {
//       console.log("email" + this.email + "password: " + this.password)
//       // const payload = {
//       //   email: this.email,
//       //   password: this.password
//       // };

//       // const headers = new Headers();
//       // headers.append('Content-Type', 'application/json');

//       // const requestOptions = {
//       //   method: 'POST',
//       //   headers: headers,
//       //   body: JSON.stringify(payload)
//       // };

//       // fetch('http://localhost:8080/api/v1/login', requestOptions)
//       //   .then(async (response) => {
//       //     if (response.ok) {
//       //       const data = await response.json();
//       //       // console.log(data);
//       //       this.cookieService.set('session_token', data.sessionToken);
//       //       const userID: number = parseInt(data.userId, 10);
//       //       // this.outletContextService.setCurrentUserId(userID);
//       //       // this.outletContextService.setSessionToken(data.sessionToken);
//       //       // this.outletContextService.setIsAuthenticated(true);
//       //       // this.outletContextService.setFirstName(data.firstName);
//       //       // this.outletContextService.setLastName(data.lastName);
//       //       this.router.navigate(['/']);
//       //     } else {
//       //       const errorText = await response.text();
//       //       this.addInfo(errorText, 'error');
//       //     }
//       //   })
//       //   .catch(error => {
//       //     console.log(error);
//       //     this.addInfo('An error occurred', 'error');
//       //   });
//     } else {
//       this.addInfo('No empty fields', 'error');
//     }
//   }
// }
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.formBuilder.group({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
  ) { }

  addInfo = (str: string, type: string) => {
    this.alertService.setAlert(str, type, "alert-banner")
    setTimeout(() => {
      this.alertService.setAlert(str, type, "hidden")
    }, 4000)
  }

  onSubmit(e: any): void {
    e.preventDefault()
    const email = this.registerForm.value.email
    const firstName = this.registerForm.value.firstName
    const lastName = this.registerForm.value.lastName
    const password = this.registerForm.value.password
    const confirmPassword = this.registerForm.value.confirmPassword
    if (email !== '' && firstName !== '' && lastName !== '' && password !== '' && confirmPassword !== '') {
      if (password === confirmPassword) {
        const payload = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password
        };
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload)
        }
        fetch("http://localhost:8080/api/v1/register", requestOptions)
          .then(async (response) => {
            if (response.ok) {
              const data = await response.json();
              this.addInfo("Succesfully registered", "success")
              this.router.navigate(['/login']);
            } else {
              const errorText = await response.text();
              if (errorText === "Email is already taken") {
                // Handle the specific email taken error
                this.addInfo(errorText, "error");
              } else {
                // Handle other error cases
                this.addInfo("An error occurred", "error");
              }
            }
          })
          .catch(error => {
            console.log(error)
            this.addInfo('An error occurred', 'error');
          })
      } else {
        this.addInfo('Passwords must match', 'error');
      }
    } else {
      this.addInfo('No empty fields', 'error');
    }
  }
}
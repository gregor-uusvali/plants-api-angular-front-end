import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { RegisterService } from './register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: false
})
export class RegisterComponent {

  formBuilder = inject(FormBuilder);
  router = inject(Router);

  registerForm = this.formBuilder.group({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  

  constructor(
    // private formBuilder: FormBuilder,
    private alertService: AlertService,
    // private router: Router,
    private registerService: RegisterService
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
        this.registerService.registerUser(payload).subscribe({
          next: (response) => {
            this.addInfo("Succesfully registered", "success")
            this.router.navigate(['/login']);
          },
          error : (error) => {
            if (error.error === "Email is already taken") {
              // Handle the specific email taken error
              this.addInfo(error.error, "error");
            } else {
              this.addInfo("An error occurred", "error");
            }
          }
        })
      } else {
        this.addInfo('Passwords must match', 'error');
      }
    } else {
      this.addInfo('No empty fields', 'error');
    }
  }
}
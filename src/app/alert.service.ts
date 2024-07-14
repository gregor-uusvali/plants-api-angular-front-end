import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertMessage: string = '';
  alertType: string = '';
  alertClass: string = '';

  setAlert(message: string, type: string, className:  string): void {
    this.alertMessage = message;
    this.alertType = type;
    this.alertClass = className;
  }

  addInfo = (str: string, type: string) => {
    this.setAlert(str, type, "alert-banner")
    setTimeout(() => {
      this.setAlert(str, type, "hidden")
    }, 4000)
  }
}
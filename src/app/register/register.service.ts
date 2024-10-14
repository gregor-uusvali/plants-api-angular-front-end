import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(payload: any) {
    return this.http.post<any>("http://localhost:8080/api/v1/register", payload);
  }
}

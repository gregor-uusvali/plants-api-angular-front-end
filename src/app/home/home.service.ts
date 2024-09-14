import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getUserWateredByCookie(cookie: string) {
    return this.http.get<any>(`http://localhost:8080/api/v1/profile/0?sessionToken=${cookie}`, { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching watering data:', error);
        return throwError(() => new Error('Error fetching watering data. Please try again later.'));
      })
    );
  }
}

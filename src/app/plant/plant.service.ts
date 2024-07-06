import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }

  getComments(plantId: string | null, amount: number) {
    return this.http.get<any>(`http://localhost:8080/api/v1/plants/comments/${plantId}?amount=${amount}`)
  }
}

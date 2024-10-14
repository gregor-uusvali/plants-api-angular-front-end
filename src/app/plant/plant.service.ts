import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(private http: HttpClient) {}

  getComments(plantId: string | null, amount: number, userId: number) {
    console.log("jajaja")
    const headers = new HttpHeaders({
      'userId': userId.toString() // Custom header for user ID
    });
    console.log(headers)
    return this.http.get<any>(
      `http://localhost:8080/api/v1/plants/comments/${plantId}?amount=${amount}`,
      {headers: headers}
    );
  }

  addComment(payload: any) {
    return this.http.post<any>(
      'http://localhost:8080/api/v1/comments/addComment',
      payload
    );
  }

  getPlants(id: string | null) {
    return this.http.get<any>(`http://localhost:8080/api/v1/plants/${id}`);
  }
}

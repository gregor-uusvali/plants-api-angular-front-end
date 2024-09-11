import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddEditService {

  constructor(private http: HttpClient) { }

  getPlants(cookie: string) {
    return this.http.get<any>(`http://localhost:8080/api/v1/plants/user/${cookie}`);
  }

  addPlant(formData: FormData) {
    return this.http.post<any>('http://localhost:8080/api/v1/plants/add', formData, { observe: 'response' });
  }

  deletePlant(plantId: number) {
    return this.http.delete<any>(`http://localhost:8080/api/v1/plants/${plantId}`, { observe: 'response' });
  }

  updatePlant(plantId: number, formData: FormData) {
    return this.http.put<any>(`http://localhost:8080/api/v1/plants/${plantId}`, formData , { observe: 'response' });
  }
}

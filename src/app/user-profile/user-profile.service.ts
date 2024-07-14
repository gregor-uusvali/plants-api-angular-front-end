import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) { }

  getUser = (id: String | null) => {
    return this.http.get<any>(`http://localhost:8080/api/v1/user/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  editUserPic = (formData: any) => {
    return this.http.put(`http://localhost:8080/api/v1/editUserImg/${this.sessionService.currentUserId}`, formData);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addCommentLike(payload: any) {
    return this.http.post<any>(
      'http://localhost:8080/api/v1/comments/likeComment',
      payload
    );
  }
  
}

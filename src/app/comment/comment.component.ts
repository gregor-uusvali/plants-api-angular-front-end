import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment: any;

  constructor (
    private commentService: CommentService,
    public sessionService: SessionService) {}

  addLike(commendId: number, status: number) {
    if (this.sessionService.currentUserId !== 0) {
      const payload = {
        commentId: commendId,
        userId: this.sessionService.currentUserId,
        status: status
      }
      this.commentService.addCommentLike(payload).subscribe({
        next: (response) => {
          console.log(response)
          const prevStatus = this.comment.userStatus;
          console.log(prevStatus)
          console.log(this.comment)
          this.comment.userStatus = response.status;
          if (response.status === 1) {
            this.comment.likeCount++;
            if (prevStatus === -1) this.comment.dislikeCount--;
          } else if (response.status === -1) {
            this.comment.dislikeCount++;
            if (prevStatus === 1) this.comment.likeCount--;
          } else {
            if (prevStatus === -1) this.comment.dislikeCount--;
            if (prevStatus === 1) this.comment.likeCount--;
          }
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
}

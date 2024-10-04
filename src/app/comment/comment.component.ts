import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{
  constructor (private commentService: CommentService,
    public sessionService: SessionService) {}
  @Input() comment: any;

  ngOnInit() {
    console.log(this.comment)
  }

  addLike(commendId: number, status: number) {
    console.log('click')
    const payload = {
      commentId: commendId,
      userId: this.sessionService.currentUserId,
      status: status
    }
    this.commentService.addCommentLike(payload).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}

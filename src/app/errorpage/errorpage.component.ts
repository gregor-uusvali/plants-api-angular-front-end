import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent {
  error: any;

  constructor(private route: ActivatedRoute){
    this.error = this.route.snapshot.data['error'] || {message: 'An unexpected error occurred'}
  }
}

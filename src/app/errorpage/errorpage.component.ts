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
    console.log(window.history.state)
    this.error = window.history.state || {message: 'An unexpected error occurred'}
    console.log(route.snapshot.data['error'])
  }
}

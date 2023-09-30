import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() class: string = '';
  @Input() type: string = 'error';

  get alertClass(): string {
    return `flex items-center p-4 mb-4 text-sm ${this.type === 'error' ? 'text-red-800' : 'text-green-800'} rounded-lg ${this.type === 'error' ? 'bg-red-50' : 'bg-green-50'} dark:bg-gray-800 dark:text-${this.type === 'error' ? 'red-400' : 'green-400'} ${this.class}`;
  }

  get messageClass(): string {
    return `font-medium ${this.type === 'error' ? 'text-red-800' : 'text-green-800'}`;
  }
}

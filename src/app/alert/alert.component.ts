import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: string = '';
  @Input() className: string = '';

  get alertClasses(): string {
    if (this.type === 'error') {
      return 'alert flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400';
    } else if (this.type === 'success') {
      return 'alert flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400';
    } else {
      return 'alert'; // Default class when type is not recognized
    }
  }
}

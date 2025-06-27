import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.css'],
    standalone: true,
})
export class ConfirmationModalComponent {
  @Input() isOpen: boolean = false;
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();

  cancel(): void {
    this.onCancel.emit();
  }

  confirm(): void {
    this.onConfirm.emit();
  }
}

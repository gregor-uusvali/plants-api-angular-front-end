import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from './add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';



@NgModule({
  declarations: [AddEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmationModalComponent
  ]
})
export class AddEditModule { }

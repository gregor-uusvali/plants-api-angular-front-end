import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PlantType } from '../models/plant.models';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  selectedFile: File | null = null;
  plants: PlantType[] = []; // Define and initialize the 'plants' property

  plantForm = this.formBuilder.group({
    name: '',
    description: '',
    instruction: '',
    image: [this.selectedFile]
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  doTheFlip(e: any): void{
    const elementsWithClass = document.querySelectorAll('.do-the-flip');
      elementsWithClass.forEach((element) => {
        element.classList.remove('do-the-flip');
      });
      // Add the 'do-the-flip' class to the target element
      const childElement = e.currentTarget.querySelector('.flip-card-inner');
      if (childElement) {
        childElement.classList.add('do-the-flip');
      }
  }
  removeTheFlip(e: any): void {
    e.stopPropagation();
    const flipCardInnerElements = document.querySelectorAll(".flip-card-inner")
    flipCardInnerElements.forEach((e) => {
      e.classList.remove('do-the-flip');
    });
  }

  handleAdd(e: any): void {
    console.log(this.plantForm.value)
  }

  handleFileChange = (e: any) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    this.plantForm.value.image = target.files[0]
    console.log('target', target.files)
  }
}

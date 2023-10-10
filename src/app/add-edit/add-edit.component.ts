import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PlantType } from '../models/plant.models';
import { AlertService } from '../alert.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  selectedFile: File | "" = "";
  plants: PlantType[] = []; // Define and initialize the 'plants' property
  activePlantId: number | null = null
  clicked: boolean = false
  plantId: number = 0
  plantName: string = ""
  plantDescription: string = ""
  plantInstruction: string = ""
  isConfirmationModalOpen: boolean = false;


  plantForm = this.formBuilder.group({
    name: '',
    description: '',
    instruction: '',
    image: [this.selectedFile]
  });

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public sessionService: SessionService,
  ) { }



  ngOnInit() {

    this.getPlants();

  }

  openConfirmationModal(): void {
    this.isConfirmationModalOpen = true;
  }

  onCancel(): void {
    this.isConfirmationModalOpen = false;
    // Handle cancellation logic if needed
  }

  onConfirm(e: Event): void {

    console.log(e)
    this.isConfirmationModalOpen = false;
    this.handleDelete()
    // Handle confirmation logic if needed
  }

  addInfo = (str: string, type: string) => {
    this.alertService.setAlert(str, type, "alert-banner")
    setTimeout(() => {
      this.alertService.setAlert(str, type, "hidden")
    }, 4000)
  }
  setInitialVals = (plantId: number) => {
    if(!this.clicked){

      for (let i = 0; i < this.plants.length; i++) {
        if (this.plants[i].id === plantId) {
          console.log("plant found with id: ", this.plants[i].id)
          this.plantId = plantId
          this.plantName = this.plants[i].name
          this.plantDescription = this.plants[i].description
          this.plantInstruction = this.plants[i].instruction
          this.selectedFile = ""
          break
        }
      }
    }
  }


  doTheFlip(e: any, plantId: number | null = null): void {
    if(this.activePlantId !== plantId){
      this.clicked = false
    }
    this.activePlantId = plantId
    console.log(this.activePlantId)
    if (!this.clicked) {
      if (plantId !== null) {
        this.setInitialVals(plantId)
      } else {
        this.plantId = 0
        this.plantName = ""
        this.plantDescription = ""
        this.plantInstruction = ""
        this.selectedFile = ""
      }
      const elementsWithClass = document.querySelectorAll('.do-the-flip');
      elementsWithClass.forEach((element) => {
        element.classList.remove('do-the-flip');
      });
      // Add the 'do-the-flip' class to the target element
      const childElement = e.currentTarget.querySelector('.flip-card-inner');
      if (childElement) {
        childElement.classList.add('do-the-flip');
      }
    } else {
      const flipCardInnerElements = document.querySelectorAll('.flip-card-inner');
      flipCardInnerElements.forEach((element) => {
        element.classList.remove('do-the-flip');
      });
      if (plantId !== null) {
        this.setInitialVals(plantId)
      } else {
        this.plantId = 0
        this.plantName = ""
        this.plantDescription = ""
        this.plantInstruction = ""
        this.selectedFile = ""
      }
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
    this.clicked = true
    this.activePlantId = plantId
  }
  removeTheFlip(e: any): void {
    this.clicked = false
    this.clearInputFile()
    e.stopPropagation();
    const flipCardInnerElements = document.querySelectorAll(".flip-card-inner")
    flipCardInnerElements.forEach((e) => {
      e.classList.remove('do-the-flip');
    });
  }

  getPlants = () => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const requestOptions = {
      method: "GET",
      headers: headers,

    }
    fetch(`http://localhost:8080/api/v1/plants`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.plants = data
        console.log(this.plants)
      })
      .catch(err => {
        console.log(err)
      })
  }


  handleAdd(e: any): void {
    e.preventDefault()
    console.log(this.plantForm.value)
    const name = this.plantForm.value.name
    const description = this.plantForm.value.description
    const instruction = this.plantForm.value.instruction
    const image = this.plantForm.value.image
    if (name !== "" && description !== "" && instruction !== "" && image !== null) {
      const currentDate = new Date()
      const formData = new FormData()
      if (name && description && instruction) {
        formData.append("name", name)
        formData.append("description", description);
        if (image) {
          formData.append("image", image);
        }
        formData.append("instruction", instruction);
        formData.append("date", currentDate.toISOString().substring(0, 10));
        formData.append("userId", this.sessionService.currentUserId.toString())
        console.log(formData)
        const requestOptions = {
          method: "POST",
          body: formData,
        };
        fetch("http://localhost:8080/api/v1/plants/add", requestOptions)
          .then(async (response) => {
            if (response.ok) {
              // const data = await response.json();
              this.addInfo("New plant added!", "success");
              this.removeTheFlip(e);
              this.plantId = 0
              this.plantName = ""
              this.plantDescription = ""
              this.plantInstruction = ""
              this.selectedFile = ""
              this.getPlants();
            } else {
              const errorText = await response.text();
              this.addInfo(errorText, "error");
            }
          })
          .catch((error) => {
            console.log(error);
            this.addInfo("An error has occurred", "error");
          });
      }
    } else {
      this.addInfo("No empty fields", "error");
    }
  }


  handleDelete = () => {
    // e.preventDefault();
    console.log("Deleting plant with id: ", this.plantId)
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:8080/api/v1/plants/${this.plantId}`, requestOptions)
      .then(async (response) => {
        if (response.ok) {
          this.addInfo("Plant deleted!", "success")
          // this.removeTheFlip(e);
          this.plantId = 0
          this.plantName = ""
          this.plantDescription = ""
          this.plantInstruction = ""
          this.selectedFile = ""
          this.clearInputFile()
          this.getPlants();
        } else {
          const errorText = await response.text();
          this.addInfo(errorText, "error");
        }
      })
      .catch((error) => {
        console.log(error)
        this.addInfo("An error has occured", "error")
      });
  }

  handleUpdate = (e: any) => {
    e.preventDefault();
    if (this.plantName !== "" && this.plantDescription !== "" && this.plantInstruction !== "") {
      const formData = new FormData();
      const updatedName = this.plantName;
      const updatedDescription = this.plantDescription;
      const updatedInstruction = this.plantInstruction;
      formData.append("name", updatedName);
      formData.append("description", updatedDescription);
      formData.append("instruction", updatedInstruction);
      console.log(updatedName)
      if (this.selectedFile !== "") {
        const updatedImage = this.selectedFile;
        formData.append("image", updatedImage);
      }
      const requestOptions = {
        method: "PUT",
        body: formData,
      };
      console.log(this.plantId)
      fetch(`http://localhost:8080/api/v1/plants/${this.plantId}`, requestOptions)
        .then(async (response) => {
          if (response.ok) {
            this.addInfo("Plant edited!", "success")

            this.removeTheFlip(e);
            this.plantId = 0
            this.plantName = ""
            this.plantDescription = ""
            this.plantInstruction = ""
            this.selectedFile = ""
            this.getPlants();
          } else {
            const errorText = await response.text();
            this.addInfo(errorText, "error");
          }
        })
        .catch((error) => {
          console.log(error)
          this.addInfo("An error has occured", "error")
        });
    } else {
      this.addInfo("No empty fields", "error")
    }
  };

  handleFileChange = (e: any) => {
    console.log(e)
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    if (target.files.length > 0) {
      this.plantForm.value.image = target.files[0]
      this.selectedFile = target.files[0]
    } else {
      this.plantForm.value.image = ""
    }
    console.log('target', this.plantForm.value.image)
  }

  handleNameChange = (e: any) => {
    const target = e.target as HTMLInputElement
    this.plantName = target.value
    console.log(this.plantName)
  }
  handleDescriptionChange = (e: any) => {
    const target = e.target as HTMLInputElement
    this.plantDescription = target.value
  }
  handleInstructionChange = (e: any) => {
    const target = e.target as HTMLInputElement
    this.plantInstruction = target.value

  }
  clearInputFile = () => {
    const inputs = document.querySelectorAll<HTMLInputElement>(".inputFileClass");
    inputs.forEach(input => {
      input.value = "";
    });
  };
}

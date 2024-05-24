import { Component } from '@angular/core';
import { PlantType } from '../models/plant.models';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})


export class PlantComponent {
  id: string | null = null
  plant: PlantType = {
    id: 0,
    name: '',
    description: '',
    image: '',
    instruction: '',
    date: ''
  }

  commentForm = this.formBuilder.group({
    comment: '',
  });

  datePlaceholder:string = new Date().toUTCString();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public sessionService: SessionService,
    public formBuilder: FormBuilder,
    public alertService: AlertService
  ) { }
  ngOnInit() {
    console.log(this.sessionService)
    this.fetchPlant();
  }

  addInfo = (str: string, type: string) => {
    this.alertService.setAlert(str, type, "alert-banner")
    setTimeout(() => {
      this.alertService.setAlert(str, type, "hidden")
    }, 4000)
  }

  fetchPlant() {
    this.id = this.route.snapshot.paramMap.get('id');
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const requestOptions = {
      method: "GET",
      headers: headers
    }
    fetch(`http://localhost:8080/api/v1/plants/${this.id}`, requestOptions)
      .then((response) => {
        if (response.status === 404) {
          this.router.navigateByUrl('/error', { state: { error: "Plant not found", status: 404} });
        }
        return response.json();
      })
      .then((data) => {
        let plant = {
          id: data.id,
          name: data.name,
          description: data.description,
          image: data.image,
          instruction: data.instruction,
          date: data.date,
        };
        this.plant = plant;
      })
      .catch((error) => {
        // This catch block will be entered if there's a rejected promise (e.g., a 404 response)
        console.log(error);
      });
  }

  fetchComments() {

  }

  // handleAdd(e: any): void {
  //   e.preventDefault()
  //   console.log(this.plantForm.value)
  //   const name = this.plantForm.value.name
  //   const description = this.plantForm.value.description
  //   const instruction = this.plantForm.value.instruction
  //   const image = this.plantForm.value.image
  //   if (name !== "" && description !== "" && instruction !== "" && image !== null) {
  //     const currentDate = new Date()
  //     const formData = new FormData()
  //     if (name && description && instruction) {
  //       formData.append("name", name)
  //       formData.append("description", description);
  //       if (image) {
  //         formData.append("image", image);
  //       }
  //       formData.append("instruction", instruction);
  //       formData.append("date", currentDate.toISOString().substring(0, 10));
  //       formData.append("userId", this.sessionService.currentUserId.toString())
  //       console.log(formData)
  //       const requestOptions = {
  //         method: "POST",
  //         body: formData,
  //       };
  //       fetch("http://localhost:8080/api/v1/plants/add", requestOptions)
  //         .then(async (response) => {
  //           if (response.ok) {
  //             // const data = await response.json();
  //             this.addInfo("New plant added!", "success");
  //             this.removeTheFlip(e);
  //             this.plantId = 0
  //             this.plantName = ""
  //             this.plantDescription = ""
  //             this.plantInstruction = ""
  //             this.selectedFile = ""
  //             this.getPlants();
  //           } else {
  //             const errorText = await response.text();
  //             this.addInfo(errorText, "error");
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           this.addInfo("An error has occurred", "error");
  //         });
  //     }
  //   } else {
  //     this.addInfo("No empty fields", "error");
  //   }
  // }



  addComment(e: any): void {
    e.preventDefault();
    const commentText = this.commentForm.value.comment;
    const userId = this.sessionService.currentUserId;
    const plantId = this.plant.id;
    if (commentText !== '') {
      const payload = {
        commentText: commentText,
        userId: userId,
        plantId: plantId
      };

      const headers = new Headers();
      headers.append('Content-Type', 'application/json')

      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      }; 
      fetch('http://localhost:8080/api/v1/comments/addComment', requestOptions)
        .then(async (response) => {
          console.log(response)
        })
        .catch(error => {
          console.log(error);
          this.addInfo('An error occurred', 'error');
        });
      this.addInfo('Login successful!', 'success')

    } else {
      this.addInfo("Comment can't be empty", 'error');
    }
  }

}

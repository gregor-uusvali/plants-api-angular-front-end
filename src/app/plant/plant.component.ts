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
    this.fetchComments();
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
    this.id = this.route.snapshot.paramMap.get('id');
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const requestOptions = {
      method: "GET",
      headers: headers
    }
    fetch(`http://localhost:8080/api/v1/plants/comments/${this.id}`, requestOptions)
      .then((response) => {
        if (response.status === 404) {
          this.router.navigateByUrl('/error', { state: { error: "Plant comments not found", status: 404} });
        }
        return response.json();
      })
      .then((data) => {
        console.log("comments:", data)
      })
      .catch((error) => {
        // This catch block will be entered if there's a rejected promise (e.g., a 404 response)
        console.log(error);
      });
  }

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

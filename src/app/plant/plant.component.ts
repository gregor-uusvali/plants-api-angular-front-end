import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PlantType } from '../models/plant.models';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../alert.service';
import { PlantService } from './plant.service';

// @HostListener('window:scroll', ['$event']) // for window scroll events

export interface CommentWithUserDTO {
  id: number;
  userId: number;
  plantId: number;
  commentText: string;
  likeCount: number;
  dislikeCount: number;
  date: string; // or Date if you plan to handle it as a Date object
  email: string;
  firstName: string;
  lastName: string;
  image: string | null;
}
@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})


export class PlantComponent {
  @ViewChild('commentTextarea') commentTextarea !: ElementRef;
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

  comments: any;
  commentAmount: number = 10;
  bottomReached: boolean = false;

  datePlaceholder:string = new Date().toUTCString();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public sessionService: SessionService,
    public formBuilder: FormBuilder,
    public alertService: AlertService,
    private plantService: PlantService
  ) { }
  ngOnInit() {
    console.log(this.sessionService)
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchPlant(this.id);
    this.fetchComments(this.id, this.commentAmount);
  }

  addInfo = (str: string, type: string) => {
    this.alertService.setAlert(str, type, "alert-banner")
    setTimeout(() => {
      this.alertService.setAlert(str, type, "hidden")
    }, 4000)
  }

  fetchPlant(id: String | null) {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const requestOptions = {
      method: "GET",
      headers: headers
    }
    fetch(`http://localhost:8080/api/v1/plants/${id}`, requestOptions)
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

  fetchComments(id: string | null, amount: number) {
    this.plantService.getComments(id, amount).subscribe(data => {
      if (this.comments?.length > 0) {
        this.comments.push(...data)
      } else {
        this.comments = data;
      }
      console.log(data)
    })
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
          const data = await response.json(); // Parse the response as JSON
          console.log(data); // Log the comment object
        })
        .catch(error => {
          console.log(error);
          this.addInfo('An error occurred', 'error');
        });

      // this.addInfo('Comment added successful!', 'success')
      this.commentTextarea.nativeElement.value = "";

    } else {
      this.addInfo("Comment can't be empty", 'error');
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if ((document.body.clientHeight + window.scrollY) >= document.body.scrollHeight) {
        if (!this.bottomReached){
          console.log('triggred');
          this.commentAmount += 10;
          this.fetchComments(this.id, this.commentAmount);
        }
        this.bottomReached=true;
    }
  }

}

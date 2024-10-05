import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PlantType } from '../models/plant.models';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../alert.service';
import { PlantService } from './plant.service';
import { Subject, interval, takeUntil, timer } from 'rxjs';

export interface CommentWithUserDTO {
  comment: any;
  email: string;
  firstName: string;
  lastName: string;
  image: string | null;
  userStatus: number;
}
@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css'],
})
export class PlantComponent {
  @ViewChild('commentTextarea') commentTextarea!: ElementRef;
  id: string | null = null;
  plant: PlantType = {
    id: 0,
    name: '',
    description: '',
    image: '',
    instruction: '',
    date: '',
  };

  commentForm = this.formBuilder.group({
    comment: '',
  });

  comments: any;
  commentAmount: number = 10;
  bottomReached: boolean = false;

  datePlaceholder: string = new Date().toUTCString();
  
  private destroy$ = new Subject<void>(); // Subject to manage unsubscription


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public sessionService: SessionService,
    public formBuilder: FormBuilder,
    public alertService: AlertService,
    private plantService: PlantService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // Subscribe to session readiness
    this.sessionService.sessionReady$
      .pipe(takeUntil(this.destroy$)) // Unsubscribe when component is destroyed
      .subscribe(isReady => {
        if (isReady) {
          this.fetchPlant(this.id);
          this.fetchComments(this.id, this.commentAmount);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(); // Emit a value to complete the Subject
    this.destroy$.complete(); // Complete the Subject
  }

  addInfo = (str: string, type: string) => {
    this.alertService.setAlert(str, type, 'alert-banner');
    setTimeout(() => {
      this.alertService.setAlert(str, type, 'hidden');
    }, 4000);
  };

  fetchPlant(id: string | null) {
    this.plantService.getPlants(id).subscribe({
      next: (response) => {
        let plant = {
          id: response.id,
          name: response.name,
          description: response.description,
          image: response.image,
          instruction: response.instruction,
          date: response.date,
        };
        this.plant = plant;
      },
      error: (error) => {
        if (error.status === 404) {
          this.router.navigateByUrl('/error', {
            state: { error: 'Plant not found', status: 404 },
          });
        }
        console.log(error);
      },
    });
  }

  fetchComments(id: string | null, amount: number) {
    console.log(this.sessionService.currentUserId)
    this.plantService.getComments(id, amount, this.sessionService.currentUserId).subscribe({
      next: (response) => {
        if (this.comments?.length > 0) {
          this.comments.push(...response);
        } else {
          this.comments = response;
        }
        if (response.length > 0) {
          this.bottomReached = false;
        }
      },
      error: (error) => {
        console.log(error);
      },
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
        plantId: plantId,
      };

      this.plantService.addComment(payload).subscribe({
        next: (response) => {
          const comment: CommentWithUserDTO = {
            comment: response,
            email: this.sessionService.email,
            firstName: this.sessionService.firstName,
            lastName: this.sessionService.lastName,
            image: this.sessionService.image,
            userStatus: 0,

          };
          this.comments.unshift(comment);
        },
        error: (error) => {
          this.addInfo(`An error occurred: ${error}`, 'error');
        },
      });
      this.commentTextarea.nativeElement.value = '';
    } else {
      this.addInfo("Comment can't be empty", 'error');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (
      document.body.clientHeight + window.scrollY >=
      document.body.scrollHeight
    ) {
      if (!this.bottomReached) {
        console.log('triggred');
        this.commentAmount += 10;
        this.fetchComments(this.id, this.commentAmount);
      }
      this.bottomReached = true;
    }
  }
}

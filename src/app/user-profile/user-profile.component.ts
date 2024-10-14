import { Component, TemplateRef } from '@angular/core';
import { SessionService } from '../session.service';
import { AlertService } from '../alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  id: string | null = null;
  numberOfPlants: number = 0;
  firstName: string = "";
  lastName: string = "";
  createdAt: string = "";
  image: string | null = null;

  editName: boolean = false;
  editNameForm: FormGroup;


  constructor(
    public sessionService: SessionService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService,
    private dialog: MatDialog, // Inject MatDialog
    private fb: FormBuilder
  ) {
    this.editNameForm = this.fb.group({
      firstName: [''],
      lastName: ['']
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const newId:number = +params['id']; // Extract the 'id' route parameter
      this.id = newId.toString()
      // You can also update your session service's currentUserId here, if needed
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser()

  }

  handleFileInput(e: any) {
    e.preventDefault();
    const selectedFile = e.target.files[0]; // Get the first selected file

    if (selectedFile) {
      console.log('Selected file:', selectedFile);
      const formData = new FormData();
      formData.append("image", selectedFile);
      this.userProfileService.editUserPic(formData).subscribe({
        next: (data: any) => {
          this.alertService.addInfo("Profile picture changed!", "success");
          this.getUser();
        },
        error: (error) => {
          console.log(error);
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            this.alertService.addInfo(`Error: ${error.error.message}`, "error");
          } else {
            // Server-side error
            this.alertService.addInfo(`Error: ${error.statusText}`, "error");
          }
        }
      })
    }
  }

  openFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  showChangePicElem = () => {
    const pic = document.getElementById("profile_profile_pic");
    pic?.classList.add("brightness-50");
    const icons = document.getElementById("profile_profile_pic_icons");
    icons?.classList.remove("hidden");
    icons?.classList.add("flex");
  }

  hideChangePicElem = () => {
    const pic = document.getElementById("profile_profile_pic");
    pic?.classList.remove("brightness-50");
    const icons = document.getElementById("profile_profile_pic_icons");
    icons?.classList.add("hidden");
    icons?.classList.remove("flex");
  }


  getUser = () => {
    this.userProfileService.getUser(this.id).subscribe({
      next: (data: any) => {
        if (data.error) {
          this.router.navigateByUrl('/error', { state: { error: data.error, status: 404} });
        }
        this.numberOfPlants = data.nrOfPlants;
        this.firstName = data.user.firstName;
        this.lastName = data.user.lastName;
        this.createdAt = data.user.createdAt;
        this.image = data.user.image;
        if (this.id == this.sessionService.currentUserId.toString()) {
          this.sessionService.image = this.image;
        }
        this.editNameForm.patchValue({
          firstName: this.firstName,
          lastName: this.lastName
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editUserName() {
    if (this.editNameForm.valid) {
      const formValues = this.editNameForm.value;

      if (formValues.firstName > '' && formValues.lastName > '') {
        this.userProfileService.editUserName(formValues).subscribe({
          next: (response: any) => {
            this.firstName = response.firstName;
            this.lastName = response.lastName;
            this.editName = false;
          },
          error: (error) => {
            console.log(error);
            this.alertService.addInfo("Failed to update name", "error");
          }
        })
      } else {
        this.alertService.addInfo("No empty fields", "error");
      }
    }
  }

  editClose() {
    this.editName = !this.editName;
    this.editNameForm.patchValue({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  openEditModal(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
}

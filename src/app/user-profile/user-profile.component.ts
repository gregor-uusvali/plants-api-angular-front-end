import { Component } from '@angular/core';
import { SessionService } from '../session.service';
import { PlantType } from '../models/plant.models';
import { AlertService } from '../alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  id: string | null = null
  numberOfPlants: number = 0
  firstName: string = ""
  lastName: string = ""
  createdAt: string = ""
  image: string | null = null

  constructor(
    public sessionService: SessionService,
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const newId:number = +params['id']; // Extract the 'id' route parameter
      this.id= newId.toString()
      // You can also update your session service's currentUserId here, if needed
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser()

  }

  addInfo = (str: string, type: string) => {
    this.alertService.setAlert(str, type, "alert-banner")
    setTimeout(() => {
      this.alertService.setAlert(str, type, "hidden")
    }, 4000)
  }

  handleFileInput(e: any) {
    e.preventDefault()
    const selectedFile = e.target.files[0]; // Get the first selected file

    if (selectedFile) {
      console.log('Selected file:', selectedFile);
      const formData = new FormData()
      formData.append("image", selectedFile);
      console.log(formData)
      const requestOptions = {
        method: "PUT",
        body: formData,
      };
      fetch(`http://localhost:8080/api/v1/editUserImg/${this.sessionService.currentUserId}`, requestOptions)
        .then(async (response) => {
          if (response.ok) {
            // const data = await response.json();
            this.addInfo("Profile picture changed!", "success");
            this.getUser()
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
  }

  openFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
  showChangePicElem = () => {
    const pic = document.getElementById("profile_profile_pic")
    pic?.classList.add("brightness-50")
    const icons = document.getElementById("profile_profile_pic_icons")
    icons?.classList.remove("hidden")
    icons?.classList.add("flex")
  }

  hideChangePicElem = () => {
    const pic = document.getElementById("profile_profile_pic")
    pic?.classList.remove("brightness-50")
    const icons = document.getElementById("profile_profile_pic_icons")
    icons?.classList.add("hidden")
    icons?.classList.remove("flex")
  }


  getUser = () => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const requestOptions = {
      method: "GET",
      headers: headers,

    }
    fetch(`http://localhost:8080/api/v1/user/${this.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.numberOfPlants = data.nrOfPlants
        this.firstName = data.user.firstName
        this.lastName = data.user.lastName
        this.createdAt = data.user.createdAt.substring(0, 10)
        this.image = data.user.image
        if(this.id == this.sessionService.currentUserId.toString()){

          this.sessionService.image = this.image
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

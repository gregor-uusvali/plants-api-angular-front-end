import { Component } from '@angular/core';
import { SessionService } from '../session.service';
import { PlantType } from '../models/plant.models';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  plants: PlantType[] = []; // Define and initialize the 'plants' property
  nrOfPlants: number = 0;
  // showChangePicElem: boolean = false
  constructor(
    public sessionService: SessionService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {

    this.getPlants();

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

  getPlants = () => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const requestOptions = {
      method: "GET",
      headers: headers,

    }
    const cookie = this.sessionService.sessionToken;
    fetch(`http://localhost:8080/api/v1/plants/user/${cookie}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.plants = data
        this.nrOfPlants = this.plants.length
        console.log(this.plants)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // getUser = () => {
  //   const headers = new Headers()
  //   headers.append("Content-Type", "application/json")

  //   const requestOptions = {
  //     method: "GET",
  //     headers: headers,

  //   }
  //   const cookie = this.sessionService.sessionToken;
  //   fetch(`http://localhost:8080/api/v1/plants/user/${cookie}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.plants = data
  //       this.nrOfPlants = this.plants.length
  //       console.log(this.plants)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
}

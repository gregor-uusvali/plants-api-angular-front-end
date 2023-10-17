import { Component } from '@angular/core';
import { SessionService } from '../session.service';
import { PlantType } from '../models/plant.models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  plants: PlantType[] = []; // Define and initialize the 'plants' property
  nrOfPlants: number = 0;
  constructor(
    public sessionService: SessionService,
  ) { }
  
  ngOnInit() {

    this.getPlants();

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
}

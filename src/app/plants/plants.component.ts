import { Component } from '@angular/core';
import { PlantType } from '../models/plant.models';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent {
  plants: PlantType[] = []

  ngOnInit() {

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
      })
      .catch(err => {
        console.log(err)
      })

  }
}

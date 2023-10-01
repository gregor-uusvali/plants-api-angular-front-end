import { Component } from '@angular/core';
import { PlantType } from '../models/plant.models';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    // private http: HttpClient
  ) { }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const requestOptions = {
      method: "GET",
      headers: headers
    }
    fetch(`http://localhost:8080/api/v1/plants/${this.id}`, requestOptions)
      .then((response) => response.json()
        .then(data => {
          let plant = {
            id: data.id,
            name: data.name,
            description: data.description,
            image: data.image,
            instruction: data.instruction,
            date: data.date,
          }
          this.plant = plant
        })
        .catch(error => {
          console.log(error)
        })
      )
  }
}

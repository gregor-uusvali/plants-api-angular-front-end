import { Component } from '@angular/core';
import { PlantType } from '../models/plant.models';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';

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
    private router: Router,
    public sessionService: SessionService,
  ) { }
  ngOnInit() {
    console.log(this.sessionService)
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
          this.router.navigate(['/error'], { state: { error: "Plant not found"} });
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
}

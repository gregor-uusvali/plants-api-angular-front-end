import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-random-plant',
    templateUrl: './random-plant.component.html',
    styleUrls: ['./random-plant.component.css'],
    standalone: false
})
export class RandomPlantComponent implements OnInit {
  constructor(private http: HttpClient) {}

  plant: any;

  ngOnInit(): void {
    this.http.get("http://localhost:8080/api/v1/dailyRandom").subscribe((data) => {
      console.log(data)
      this.plant = data;
    })
  }

}

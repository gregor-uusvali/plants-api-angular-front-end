import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.css']
})
export class GraphqlComponent implements OnInit {
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get("http://localhost:8080/api/v1/dailyRandom").subscribe((data) => {
      console.log(data)
    })
  }
}

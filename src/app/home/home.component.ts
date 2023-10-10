import { Component, AfterViewInit  } from '@angular/core';
import { AlertService } from '../alert.service';
import { SessionService } from '../session.service';
import { CookieService } from 'ngx-cookie-service';
import { Select, Ripple, initTE } from "tw-elements";
initTE({ Select, Ripple });

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  lastWatered: Date = new Date
  daysToWater: number = 0
  nextDateToWater: Date = new Date
  daysLeftToWater: number = 0
  numbers: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

  constructor(
    public  alertService: AlertService,
    public sessionService: SessionService,
    public cookieService: CookieService,
  ) {}

  
  ngOnInit() {
    this.fetchUserWateredByCookie()
  }
  
  ngAfterViewInit() {
    // console.log(this.daysToWater)
    // this.setSelected();
  }

  
  setSelected = (daysToWater: number) => {
    const selectElem = document.querySelector("#selectDays") as HTMLSelectElement;
    const children = selectElem?.children;
    
    for (let i = 0; children !== undefined && i < children?.length; i++) {
      const option = children[i] as HTMLOptionElement;
      // console.log(option.value)
      // console.log(this.daysToWater.toString())
      if (option.value === this.daysToWater.toString()) {
        option.selected = true;
        // console.log(children[i])
      } else {
        option.selected = false;
      }
    }
  }

  convertDateStrtoDate = (lastWatered: string, daysToWater: number) => {
    this.daysToWater = daysToWater
    this.setSelected(this.daysToWater);
    const newLastWateredDate = new Date(lastWatered)
    this.lastWatered = newLastWateredDate
    const newNextWateredDate = new Date(lastWatered)
    newNextWateredDate.setDate(newLastWateredDate.getDate() + daysToWater)
    this.nextDateToWater = newNextWateredDate
    let days = (newNextWateredDate.getTime() - (new Date).getTime()) / (1000 * 60 * 60 * 24)
    this.daysLeftToWater = days
  }
  fetchUserWateredByCookie = () => {
    const cookie = this.cookieService.get("session_token");
    if (cookie) {
      fetch(`http://localhost:8080/api/v1/profile/0?sessionToken=${cookie}`, {
        method: "GET",
        credentials: "include"
      })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            this.convertDateStrtoDate(data.lastWatered, data.daysToWater)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  calculateProcent = () => {
    let res = Math.round((this.daysLeftToWater / this.daysToWater) * 100)
    return res.toString()
  }

  handleUpdateWatering = (e: any): void => {
    e.preventDefault()
    fetch(`http://localhost:8080/api/v1/updateWatered/${this.sessionService.currentUserId}`, {
      method: "PUT",
    })
      .then(async resp => {
        if (resp.ok) {
          let data = await resp.json()
          this.convertDateStrtoDate(data, this.daysToWater)
        }
      })
  }
  onSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    fetch(`http://localhost:8080/api/v1/updateDaysToWater/${this.sessionService.currentUserId}`, {

      method: "PUT",
      body: selectedValue,
    })
      .then(async resp => {
        if (resp.ok) {
          let data = await resp.json()
          this.fetchUserWateredByCookie()
        }
      })
  }
}
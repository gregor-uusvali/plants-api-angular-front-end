import { Component, AfterViewInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { SessionService } from '../session.service';
import { CookieService } from 'ngx-cookie-service';
import { Select, Ripple, initTE } from 'tw-elements';
import { HomeService } from './home.service';
import { Subject, takeUntil, timer } from 'rxjs';
initTE({ Select, Ripple });

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  lastWatered: Date = new Date();
  daysToWater: number = 0;
  nextDateToWater: Date = new Date();
  daysLeftToWater: number = 0;
  numbers: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  wateredDisabled = false;

  private destroy$ = new Subject<void>();

  constructor(
    public alertService: AlertService,
    public sessionService: SessionService,
    public cookieService: CookieService,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.getUserWateredByCookie();
  }

  ngOnDestroy() {
    this.destroy$.next(); // Emit to trigger takeUntil
    this.destroy$.complete(); // Complete the subject
  }

  setSelected = () => {
    const selectElem = document.querySelector(
      '#selectDays'
    ) as HTMLSelectElement;
    const children = selectElem?.children;

    for (let i = 0; children !== undefined && i < children?.length; i++) {
      const option = children[i] as HTMLOptionElement;
      if (option.value === this.daysToWater.toString()) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    }
  };

  convertDateStrtoDate = (
    lastWatered: string,
    daysToWater: number,
    watered: boolean
  ) => {
    this.daysToWater = daysToWater;
    this.setSelected();
    const newLastWateredDate = new Date(lastWatered);
    this.lastWatered = newLastWateredDate;
    const newNextWateredDate = new Date(lastWatered);
    newNextWateredDate.setDate(newLastWateredDate.getDate() + daysToWater);
    this.nextDateToWater = newNextWateredDate;
    let days =
      (newNextWateredDate.getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24);

    if (watered) {
      let fillUp = setInterval(() => {
        this.daysLeftToWater += 0.2;
        if (this.daysLeftToWater > days) {
          this.daysLeftToWater = days;
          clearInterval(fillUp);
        }
      });
    } else {
      this.daysLeftToWater = days;
    }
  };

  getUserWateredByCookie = () => {
    const cookie = this.cookieService.get('session_token');
    cookie &&
      this.homeService
        .getUserWateredByCookie(cookie)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.convertDateStrtoDate(
              response.lastWatered,
              response.daysToWater,
              false
            );
          },
          error: (error) => {
            console.error('Error occurred:', error.message);
          },
        });
  };

  calculateProcent = () => {
    let res = Math.round((this.daysLeftToWater / this.daysToWater) * 100);
    return res.toString();
  };

  handleUpdateWatering = (e: any): void => {
    if (!this.wateredDisabled) {
      e.preventDefault();
      this.homeService
        .updateWatering(this.sessionService.currentUserId)
        .subscribe({
          next: (response) => {
            this.convertDateStrtoDate(response, this.daysToWater, true);
          },
          error: (error) => {
            console.log(error);
          },
        });
        this.wateredDisabled = true;
        timer(5000).subscribe(() => {
          this.wateredDisabled = false;
        })
    }
  };

  onSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.homeService
      .setWateringInterval(this.sessionService.currentUserId, selectedValue)
      .subscribe(() => {
        this.getUserWateredByCookie();
      });
  }
}

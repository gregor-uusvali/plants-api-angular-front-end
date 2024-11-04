import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomPlantComponent } from './random-plant.component';

describe('RandomPlantComponent', () => {
  let component: RandomPlantComponent;
  let fixture: ComponentFixture<RandomPlantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomPlantComponent]
    });
    fixture = TestBed.createComponent(RandomPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

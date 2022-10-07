import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRestaurantDetailsComponent } from './view-restaurant-details.component';

describe('ViewRestaurantDetailsComponent', () => {
  let component: ViewRestaurantDetailsComponent;
  let fixture: ComponentFixture<ViewRestaurantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRestaurantDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRestaurantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

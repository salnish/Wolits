import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantFormComponent } from './add-restaurant-form.component';

describe('AddRestaurantFormComponent', () => {
  let component: AddRestaurantFormComponent;
  let fixture: ComponentFixture<AddRestaurantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestaurantFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRestaurantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

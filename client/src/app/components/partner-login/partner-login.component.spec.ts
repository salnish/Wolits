import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerLoginComponent } from './partner-login.component';

describe('PartnerLoginComponent', () => {
  let component: PartnerLoginComponent;
  let fixture: ComponentFixture<PartnerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

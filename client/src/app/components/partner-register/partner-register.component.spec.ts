import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRegisterComponent } from './partner-register.component';

describe('PartnerRegisterComponent', () => {
  let component: PartnerRegisterComponent;
  let fixture: ComponentFixture<PartnerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

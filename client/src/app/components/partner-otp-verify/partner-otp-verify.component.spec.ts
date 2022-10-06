import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerOtpVerifyComponent } from './partner-otp-verify.component';

describe('PartnerOtpVerifyComponent', () => {
  let component: PartnerOtpVerifyComponent;
  let fixture: ComponentFixture<PartnerOtpVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerOtpVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerOtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

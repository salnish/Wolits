import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerVerifyPhoneComponent } from './partner-verify-phone.component';

describe('PartnerVerifyPhoneComponent', () => {
  let component: PartnerVerifyPhoneComponent;
  let fixture: ComponentFixture<PartnerVerifyPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerVerifyPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerVerifyPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

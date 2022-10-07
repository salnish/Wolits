import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardPanelComponent } from './onboard-panel.component';

describe('OnboardPanelComponent', () => {
  let component: OnboardPanelComponent;
  let fixture: ComponentFixture<OnboardPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

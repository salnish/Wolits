import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMangementComponent } from './menu-mangement.component';

describe('MenuMangementComponent', () => {
  let component: MenuMangementComponent;
  let fixture: ComponentFixture<MenuMangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMangementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

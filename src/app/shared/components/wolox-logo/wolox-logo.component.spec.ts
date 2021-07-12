import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoloxLogoComponent } from './wolox-logo.component';

describe('WoloxLogoComponent', () => {
  let component: WoloxLogoComponent;
  let fixture: ComponentFixture<WoloxLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoloxLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WoloxLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

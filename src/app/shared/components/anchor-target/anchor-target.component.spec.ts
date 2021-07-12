import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorTargetComponent } from './anchor-target.component';

describe('AnchorTargetComponent', () => {
  let component: AnchorTargetComponent;
  let fixture: ComponentFixture<AnchorTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnchorTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

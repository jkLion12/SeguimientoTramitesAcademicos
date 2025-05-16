import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEstudioComponent } from './plan-estudio.component';

describe('PlanEstudioComponent', () => {
  let component: PlanEstudioComponent;
  let fixture: ComponentFixture<PlanEstudioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanEstudioComponent]
    });
    fixture = TestBed.createComponent(PlanEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoTramiteComponent } from './progreso-tramite.component';

describe('ProgresoTramiteComponent', () => {
  let component: ProgresoTramiteComponent;
  let fixture: ComponentFixture<ProgresoTramiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgresoTramiteComponent]
    });
    fixture = TestBed.createComponent(ProgresoTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

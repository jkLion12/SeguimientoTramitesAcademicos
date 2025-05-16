import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionTramiteComponent } from './revision-tramite.component';

describe('RevisionTramiteComponent', () => {
  let component: RevisionTramiteComponent;
  let fixture: ComponentFixture<RevisionTramiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionTramiteComponent]
    });
    fixture = TestBed.createComponent(RevisionTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

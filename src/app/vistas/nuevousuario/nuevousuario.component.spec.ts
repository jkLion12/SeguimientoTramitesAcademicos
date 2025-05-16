import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevousuarioComponent } from './nuevousuario.component';

describe('NuevousuarioComponent', () => {
  let component: NuevousuarioComponent;
  let fixture: ComponentFixture<NuevousuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevousuarioComponent]
    });
    fixture = TestBed.createComponent(NuevousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

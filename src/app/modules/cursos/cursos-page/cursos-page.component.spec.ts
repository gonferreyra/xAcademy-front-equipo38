import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosPageComponent } from './cursos-page.component';

describe('CursosPageComponent', () => {
  let component: CursosPageComponent;
  let fixture: ComponentFixture<CursosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

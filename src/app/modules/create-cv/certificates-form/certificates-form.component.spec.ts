import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesFormComponent } from './certificates-form.component';

describe('CertificatesFormComponent', () => {
  let component: CertificatesFormComponent;
  let fixture: ComponentFixture<CertificatesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaplaceControllerDomainComponent } from './laplace-controller-domain.component';

describe('LaplaceControllerDomainComponent', () => {
  let component: LaplaceControllerDomainComponent;
  let fixture: ComponentFixture<LaplaceControllerDomainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaplaceControllerDomainComponent]
    });
    fixture = TestBed.createComponent(LaplaceControllerDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

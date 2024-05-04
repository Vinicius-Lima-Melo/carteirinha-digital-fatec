import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessValidationPage } from './access-validation.page';

describe('AccessValidationPage', () => {
  let component: AccessValidationPage;
  let fixture: ComponentFixture<AccessValidationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessValidationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidateStudentPage } from './validate-student.page';

describe('ValidateStudentPage', () => {
  let component: ValidateStudentPage;
  let fixture: ComponentFixture<ValidateStudentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

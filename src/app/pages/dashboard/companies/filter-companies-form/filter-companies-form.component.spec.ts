import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCompaniesFormComponent } from './filter-companies-form.component';

describe('FilterCompaniesFormComponent', () => {
  let component: FilterCompaniesFormComponent;
  let fixture: ComponentFixture<FilterCompaniesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCompaniesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCompaniesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

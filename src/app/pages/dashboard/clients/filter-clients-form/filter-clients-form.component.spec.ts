import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterClientsFormComponent } from './filter-clients-form.component';

describe('FilterClientsFormComponent', () => {
  let component: FilterClientsFormComponent;
  let fixture: ComponentFixture<FilterClientsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterClientsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterClientsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

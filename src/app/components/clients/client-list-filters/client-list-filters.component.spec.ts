import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListFiltersComponent } from './client-list-filters.component';

describe('ClientListFiltersComponent', () => {
  let component: ClientListFiltersComponent;
  let fixture: ComponentFixture<ClientListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

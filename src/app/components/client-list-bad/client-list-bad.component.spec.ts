import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListBadComponent } from './client-list-bad.component';

describe('ClientListComponent', () => {
  let component: ClientListBadComponent;
  let fixture: ComponentFixture<ClientListBadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListBadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListBadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

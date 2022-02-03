import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserDetailsDialogComponent } from './view-user-details-dialog.component';

describe('ViewUserDetailsDialogComponent', () => {
  let component: ViewUserDetailsDialogComponent;
  let fixture: ComponentFixture<ViewUserDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

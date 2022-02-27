import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFollowUpDialogComponent } from './client-follow-up-dialog.component';

describe('ClientFollowUpDialogComponent', () => {
  let component: ClientFollowUpDialogComponent;
  let fixture: ComponentFixture<ClientFollowUpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFollowUpDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFollowUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

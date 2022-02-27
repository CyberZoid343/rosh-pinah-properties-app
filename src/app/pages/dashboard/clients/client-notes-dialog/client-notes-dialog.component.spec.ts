import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNotesDialogComponent } from './client-notes-dialog.component';

describe('ClientNotesDialogComponent', () => {
  let component: ClientNotesDialogComponent;
  let fixture: ComponentFixture<ClientNotesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientNotesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

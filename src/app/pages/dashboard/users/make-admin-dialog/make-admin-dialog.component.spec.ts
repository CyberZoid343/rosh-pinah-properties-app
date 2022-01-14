import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAdminDialogComponent } from './make-admin-dialog.component';

describe('MakeAdminDialogComponent', () => {
  let component: MakeAdminDialogComponent;
  let fixture: ComponentFixture<MakeAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeAdminDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

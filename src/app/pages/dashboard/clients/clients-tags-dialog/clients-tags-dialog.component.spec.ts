import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTagsDialogComponent } from './clients-tags-dialog.component';

describe('ClientsTagsDialogComponent', () => {
  let component: ClientsTagsDialogComponent;
  let fixture: ComponentFixture<ClientsTagsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsTagsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsTagsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

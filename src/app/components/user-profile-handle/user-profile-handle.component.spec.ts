import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileHandleComponent } from './user-profile-handle.component';

describe('UserProfileHandleComponent', () => {
  let component: UserProfileHandleComponent;
  let fixture: ComponentFixture<UserProfileHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileHandleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

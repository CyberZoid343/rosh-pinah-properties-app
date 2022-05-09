import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePasswordFormComponent } from './profile-password-form.component';

describe('ProfilePasswordFormComponent', () => {
  let component: ProfilePasswordFormComponent;
  let fixture: ComponentFixture<ProfilePasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePasswordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

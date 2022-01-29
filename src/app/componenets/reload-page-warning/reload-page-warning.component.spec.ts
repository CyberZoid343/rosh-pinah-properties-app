import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadPageWarningComponent } from './reload-page-warning.component';

describe('ReloadPageWarningComponent', () => {
  let component: ReloadPageWarningComponent;
  let fixture: ComponentFixture<ReloadPageWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReloadPageWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadPageWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

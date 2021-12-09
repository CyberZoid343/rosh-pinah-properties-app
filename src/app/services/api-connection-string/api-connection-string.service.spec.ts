import { TestBed } from '@angular/core/testing';

import { ApiConnectionStringService } from './api-connection-string.service';

describe('ApiConnectionStringService', () => {
  let service: ApiConnectionStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConnectionStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

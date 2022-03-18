import { TestBed } from '@angular/core/testing';

import { ClientTagService } from './client-tag.service';

describe('ClientTagService', () => {
  let service: ClientTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

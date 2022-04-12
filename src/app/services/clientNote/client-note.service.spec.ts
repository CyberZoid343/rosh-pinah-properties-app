import { TestBed } from '@angular/core/testing';

import { ClientNoteService } from './client-note.service';

describe('ClientNoteService', () => {
  let service: ClientNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

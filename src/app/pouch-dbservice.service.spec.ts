import { TestBed } from '@angular/core/testing';

import { PouchDBServiceService } from './pouch-dbservice.service';

describe('PouchDBServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PouchDBServiceService = TestBed.get(PouchDBServiceService);
    expect(service).toBeTruthy();
  });
});

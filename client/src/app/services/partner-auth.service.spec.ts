import { TestBed } from '@angular/core/testing';

import { PartnerAuthService } from './partner-auth.service';

describe('PartnerAuthService', () => {
  let service: PartnerAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

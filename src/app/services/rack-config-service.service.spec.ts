import { TestBed } from '@angular/core/testing';

import { RackConfigServiceService } from './rack-config-service.service';

describe('RackConfigServiceService', () => {
  let service: RackConfigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RackConfigServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

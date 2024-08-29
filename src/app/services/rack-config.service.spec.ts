import { TestBed } from '@angular/core/testing';

import { RackConfigService } from './rack-config.service';

describe('RackConfigService', () => {
  let service: RackConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RackConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

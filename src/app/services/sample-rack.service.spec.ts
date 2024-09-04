import { TestBed } from '@angular/core/testing';

import { SampleRackService } from './sample-rack.service';

describe('SampleRackService', () => {
  let service: SampleRackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleRackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

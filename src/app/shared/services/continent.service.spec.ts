import { TestBed, inject } from '@angular/core/testing';

import { ContinentService } from './continent.service';

describe('ContinentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContinentService]
    });
  });

  it('should be created', inject([ContinentService], (service: ContinentService) => {
    expect(service).toBeTruthy();
  }));
});

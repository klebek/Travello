import { TestBed, inject } from '@angular/core/testing';

import { CountryService } from 'shared/services/country.service';

describe('CountryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryService]
    });
  });

  it('should be created', inject([CountryService], (service: CountryService) => {
    expect(service).toBeTruthy();
  }));
});

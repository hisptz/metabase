import { TestBed, inject } from '@angular/core/testing';

import { OrganisationunitService } from './organisationunit.service';

describe('OrganisationunitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganisationunitService]
    });
  });

  it('should ...', inject([OrganisationunitService], (service: OrganisationunitService) => {
    expect(service).toBeTruthy();
  }));
});

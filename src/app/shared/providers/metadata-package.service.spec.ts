import { TestBed, inject } from '@angular/core/testing';

import { MetadataPackageService } from './metadata-package.service';

describe('MetadataPackageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetadataPackageService]
    });
  });

  it('should ...', inject([MetadataPackageService], (service: MetadataPackageService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { MetadataImportService } from './metadata-import.service';

describe('MetadataImportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetadataImportService]
    });
  });

  it('should ...', inject([MetadataImportService], (service: MetadataImportService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { DataElementService } from './data-element.service';

describe('DataElementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataElementService]
    });
  });

  it('should ...', inject([DataElementService], (service: DataElementService) => {
    expect(service).toBeTruthy();
  }));
});

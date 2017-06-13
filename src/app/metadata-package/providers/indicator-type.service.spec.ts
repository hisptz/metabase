import { TestBed, inject } from '@angular/core/testing';

import { IndicatorTypeService } from './indicator-type.service';

describe('IndicatorTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndicatorTypeService]
    });
  });

  it('should ...', inject([IndicatorTypeService], (service: IndicatorTypeService) => {
    expect(service).toBeTruthy();
  }));
});

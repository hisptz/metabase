import { TestBed, inject } from '@angular/core/testing';

import { IndicatorGroupService } from './indicator-group.service';

describe('IndicatorGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndicatorGroupService]
    });
  });

  it('should ...', inject([IndicatorGroupService], (service: IndicatorGroupService) => {
    expect(service).toBeTruthy();
  }));
});

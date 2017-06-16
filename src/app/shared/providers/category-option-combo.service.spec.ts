import { TestBed, inject } from '@angular/core/testing';

import { CategoryOptionComboService } from './category-option-combo.service';

describe('CategoryOptionComboService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryOptionComboService]
    });
  });

  it('should ...', inject([CategoryOptionComboService], (service: CategoryOptionComboService) => {
    expect(service).toBeTruthy();
  }));
});

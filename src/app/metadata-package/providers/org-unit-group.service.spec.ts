import { TestBed, inject } from '@angular/core/testing';

import { OrgUnitGroupService } from './org-unit-group.service';

describe('OrgUnitGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrgUnitGroupService]
    });
  });

  it('should ...', inject([OrgUnitGroupService], (service: OrgUnitGroupService) => {
    expect(service).toBeTruthy();
  }));
});

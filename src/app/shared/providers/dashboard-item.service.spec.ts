import { TestBed, inject } from '@angular/core/testing';

import { DashboardItemService } from './dashboard-item.service';

describe('DashboardItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardItemService]
    });
  });

  it('should ...', inject([DashboardItemService], (service: DashboardItemService) => {
    expect(service).toBeTruthy();
  }));
});

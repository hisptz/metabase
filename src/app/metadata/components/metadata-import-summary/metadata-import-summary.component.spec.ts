import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataImportSummaryComponent } from './metadata-import-summary.component';

describe('MetadataImportSummaryComponent', () => {
  let component: MetadataImportSummaryComponent;
  let fixture: ComponentFixture<MetadataImportSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataImportSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataImportSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

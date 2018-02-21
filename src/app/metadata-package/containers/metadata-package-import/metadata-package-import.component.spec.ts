import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataPackageImportComponent } from './metadata-package-import.component';

describe('MetadataPackageImportComponent', () => {
  let component: MetadataPackageImportComponent;
  let fixture: ComponentFixture<MetadataPackageImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataPackageImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataPackageImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

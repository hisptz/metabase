import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataPackageSearchComponent } from './metadata-package-search.component';

describe('MetadataPackageSearchComponent', () => {
  let component: MetadataPackageSearchComponent;
  let fixture: ComponentFixture<MetadataPackageSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataPackageSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataPackageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

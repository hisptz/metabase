import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataPackageDetailsComponent } from './metadata-package-details.component';

describe('MetadataPackageDetailsComponent', () => {
  let component: MetadataPackageDetailsComponent;
  let fixture: ComponentFixture<MetadataPackageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataPackageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataPackageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

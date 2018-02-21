import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataPackageItemComponent } from './metadata-package-item.component';

describe('MetadataPackageItemComponent', () => {
  let component: MetadataPackageItemComponent;
  let fixture: ComponentFixture<MetadataPackageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataPackageItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataPackageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

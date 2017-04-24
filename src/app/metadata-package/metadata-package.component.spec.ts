import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataPackageComponent } from './metadata-package.component';

describe('MetadataPackageComponent', () => {
  let component: MetadataPackageComponent;
  let fixture: ComponentFixture<MetadataPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

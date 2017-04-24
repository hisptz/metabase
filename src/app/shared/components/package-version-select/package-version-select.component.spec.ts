import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageVersionSelectComponent } from './package-version-select.component';

describe('PackageVersionSelectComponent', () => {
  let component: PackageVersionSelectComponent;
  let fixture: ComponentFixture<PackageVersionSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageVersionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageVersionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

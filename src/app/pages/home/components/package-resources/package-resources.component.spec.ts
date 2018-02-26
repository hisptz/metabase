import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageResourcesComponent } from './package-resources.component';

describe('PackageResourcesComponent', () => {
  let component: PackageResourcesComponent;
  let fixture: ComponentFixture<PackageResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

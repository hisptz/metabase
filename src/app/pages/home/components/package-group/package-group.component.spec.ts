import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageGroupComponent } from './package-group.component';

describe('PackageGroupComponent', () => {
  let component: PackageGroupComponent;
  let fixture: ComponentFixture<PackageGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

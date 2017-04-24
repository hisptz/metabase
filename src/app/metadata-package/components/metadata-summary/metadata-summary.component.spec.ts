import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataSummaryComponent } from './metadata-summary.component';

describe('MetadataSummaryComponent', () => {
  let component: MetadataSummaryComponent;
  let fixture: ComponentFixture<MetadataSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

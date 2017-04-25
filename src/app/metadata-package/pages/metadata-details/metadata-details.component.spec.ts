import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataDetailsComponent } from './metadata-details.component';

describe('MetadataDetailsComponent', () => {
  let component: MetadataDetailsComponent;
  let fixture: ComponentFixture<MetadataDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

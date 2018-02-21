import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMetadataItemComponent } from './current-metadata-item.component';

describe('CurrentMetadataItemComponent', () => {
  let component: CurrentMetadataItemComponent;
  let fixture: ComponentFixture<CurrentMetadataItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentMetadataItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentMetadataItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

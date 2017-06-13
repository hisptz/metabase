import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriesSectionComponent } from './repositories-section.component';

describe('RepositoriesSectionComponent', () => {
  let component: RepositoriesSectionComponent;
  let fixture: ComponentFixture<RepositoriesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoriesSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

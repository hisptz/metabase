import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoTemplateComponent } from './who-template.component';

describe('WhoTemplateComponent', () => {
  let component: WhoTemplateComponent;
  let fixture: ComponentFixture<WhoTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

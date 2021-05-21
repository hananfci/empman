import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditempoloyeeComponent } from './editempoloyee.component';

describe('EditempoloyeeComponent', () => {
  let component: EditempoloyeeComponent;
  let fixture: ComponentFixture<EditempoloyeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditempoloyeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditempoloyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

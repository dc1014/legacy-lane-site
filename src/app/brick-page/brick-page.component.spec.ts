import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickPageComponent } from './brick-page.component';

describe('BrickPageComponent', () => {
  let component: BrickPageComponent;
  let fixture: ComponentFixture<BrickPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

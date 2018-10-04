import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickSearchPageComponent } from './brick-search-page.component';

describe('BrickSearchPageComponent', () => {
  let component: BrickSearchPageComponent;
  let fixture: ComponentFixture<BrickSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

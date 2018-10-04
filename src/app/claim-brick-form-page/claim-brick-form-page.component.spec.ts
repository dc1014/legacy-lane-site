import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimBrickFormPageComponent } from './claim-brick-form-page.component';

describe('ClaimBrickFormPageComponent', () => {
  let component: ClaimBrickFormPageComponent;
  let fixture: ComponentFixture<ClaimBrickFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimBrickFormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimBrickFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

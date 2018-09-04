import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserCardComponent } from './select-user-card.component';

describe('SelectUserCardComponent', () => {
  let component: SelectUserCardComponent;
  let fixture: ComponentFixture<SelectUserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectUserCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

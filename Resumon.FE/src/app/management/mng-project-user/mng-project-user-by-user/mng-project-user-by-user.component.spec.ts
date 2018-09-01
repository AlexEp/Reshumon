import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MngProjectUserByUserComponent } from './mng-project-user-by-user.component';

describe('MngProjectUserByUserComponent', () => {
  let component: MngProjectUserByUserComponent;
  let fixture: ComponentFixture<MngProjectUserByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MngProjectUserByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MngProjectUserByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MngProjectUserComponent } from './mng-project-user.component';

describe('MngProjectUserComponent', () => {
  let component: MngProjectUserComponent;
  let fixture: ComponentFixture<MngProjectUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MngProjectUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MngProjectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

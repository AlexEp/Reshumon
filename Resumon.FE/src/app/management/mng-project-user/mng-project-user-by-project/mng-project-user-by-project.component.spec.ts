import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MngProjectUserByProjectComponent } from './mng-project-user-by-project.component';

describe('MngProjectUserByProjectComponent', () => {
  let component: MngProjectUserByProjectComponent;
  let fixture: ComponentFixture<MngProjectUserByProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MngProjectUserByProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MngProjectUserByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

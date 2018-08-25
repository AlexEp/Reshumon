import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MngProjectsComponent } from './mng-projects.component';

describe('MngProjectsComponent', () => {
  let component: MngProjectsComponent;
  let fixture: ComponentFixture<MngProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MngProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MngProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

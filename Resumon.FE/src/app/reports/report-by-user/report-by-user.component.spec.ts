import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByUserComponent } from './report-by-user.component';

describe('ReportByUserComponent', () => {
  let component: ReportByUserComponent;
  let fixture: ComponentFixture<ReportByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

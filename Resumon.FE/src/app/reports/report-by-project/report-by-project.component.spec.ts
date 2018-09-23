import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByProjectComponent } from './report-by-project.component';

describe('ReportByProjectComponent', () => {
  let component: ReportByProjectComponent;
  let fixture: ComponentFixture<ReportByProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

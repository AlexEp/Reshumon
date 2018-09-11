import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedLoadingComponent } from './animated-loading.component';

describe('AnimatedLoadingComponent', () => {
  let component: AnimatedLoadingComponent;
  let fixture: ComponentFixture<AnimatedLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

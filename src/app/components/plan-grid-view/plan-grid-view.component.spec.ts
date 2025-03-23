import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGridViewComponent } from './plan-grid-view.component';

describe('PlanGridViewComponent', () => {
  let component: PlanGridViewComponent;
  let fixture: ComponentFixture<PlanGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanGridViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

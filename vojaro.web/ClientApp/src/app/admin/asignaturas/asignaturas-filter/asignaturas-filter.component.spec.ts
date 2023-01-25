import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasFilterComponent } from './asignaturas-filter.component';

describe('AsignaturasFilterComponent', () => {
  let component: AsignaturasFilterComponent;
  let fixture: ComponentFixture<AsignaturasFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturasFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturasFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

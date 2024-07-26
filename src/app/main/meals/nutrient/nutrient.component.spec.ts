import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientComponent } from './nutrient.component';

describe('NutrientComponent', () => {
  let component: NutrientComponent;
  let fixture: ComponentFixture<NutrientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutrientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

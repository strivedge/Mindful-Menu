import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyMenuEditComponent } from './weekly-menu-edit.component';

describe('WeeklyMenuEditComponent', () => {
  let component: WeeklyMenuEditComponent;
  let fixture: ComponentFixture<WeeklyMenuEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyMenuEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

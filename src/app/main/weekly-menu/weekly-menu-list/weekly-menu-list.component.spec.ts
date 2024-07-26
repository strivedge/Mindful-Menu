import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyMenuListComponent } from './weekly-menu-list.component';

describe('WeeklyMenuListComponent', () => {
  let component: WeeklyMenuListComponent;
  let fixture: ComponentFixture<WeeklyMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyMenuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCountCardComponent } from './sub-count-card.component';

describe('SubCountCardComponent', () => {
  let component: SubCountCardComponent;
  let fixture: ComponentFixture<SubCountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCountCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

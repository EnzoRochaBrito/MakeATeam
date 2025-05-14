import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandartComponent } from './standart.component';

describe('StandartComponent', () => {
  let component: StandartComponent;
  let fixture: ComponentFixture<StandartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

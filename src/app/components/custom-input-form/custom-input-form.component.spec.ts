import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputFormComponent } from './custom-input-form.component';

describe('CustomInputFormComponent', () => {
  let component: CustomInputFormComponent;
  let fixture: ComponentFixture<CustomInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInputFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

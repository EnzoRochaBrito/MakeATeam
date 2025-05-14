import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessButtonComponent } from './acess-button.component';

describe('AcessButtonComponent', () => {
  let component: AcessButtonComponent;
  let fixture: ComponentFixture<AcessButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

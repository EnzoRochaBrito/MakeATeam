import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltHeaderComponent } from './alt-header.component';

describe('AltHeaderComponent', () => {
  let component: AltHeaderComponent;
  let fixture: ComponentFixture<AltHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

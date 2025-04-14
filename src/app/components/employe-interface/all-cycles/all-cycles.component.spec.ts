import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCyclesComponent } from './all-cycles.component';

describe('AllCyclesComponent', () => {
  let component: AllCyclesComponent;
  let fixture: ComponentFixture<AllCyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCyclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleDescComponent } from './cycle-desc.component';

describe('CycleDescComponent', () => {
  let component: CycleDescComponent;
  let fixture: ComponentFixture<CycleDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

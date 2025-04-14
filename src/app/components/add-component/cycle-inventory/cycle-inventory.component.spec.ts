import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleInventoryComponent } from './cycle-inventory.component';

describe('CycleInventoryComponent', () => {
  let component: CycleInventoryComponent;
  let fixture: ComponentFixture<CycleInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

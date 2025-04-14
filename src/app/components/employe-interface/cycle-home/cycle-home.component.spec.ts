import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleHomeComponent } from './cycle-home.component';

describe('CycleHomeComponent', () => {
  let component: CycleHomeComponent;
  let fixture: ComponentFixture<CycleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

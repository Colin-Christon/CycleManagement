import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeInterfaceComponent } from './employe-interface.component';

describe('EmployeInterfaceComponent', () => {
  let component: EmployeInterfaceComponent;
  let fixture: ComponentFixture<EmployeInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

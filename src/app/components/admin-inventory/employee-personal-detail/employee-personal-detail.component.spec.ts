import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePersonalDetailComponent } from './employee-personal-detail.component';

describe('EmployeePersonalDetailComponent', () => {
  let component: EmployeePersonalDetailComponent;
  let fixture: ComponentFixture<EmployeePersonalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePersonalDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePersonalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

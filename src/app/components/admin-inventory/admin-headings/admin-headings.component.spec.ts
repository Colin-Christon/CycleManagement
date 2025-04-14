import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeadingsComponent } from './admin-headings.component';

describe('AdminHeadingsComponent', () => {
  let component: AdminHeadingsComponent;
  let fixture: ComponentFixture<AdminHeadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHeadingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHeadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

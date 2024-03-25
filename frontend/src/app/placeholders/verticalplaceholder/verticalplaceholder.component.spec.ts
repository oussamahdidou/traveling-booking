import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalplaceholderComponent } from './verticalplaceholder.component';

describe('VerticalplaceholderComponent', () => {
  let component: VerticalplaceholderComponent;
  let fixture: ComponentFixture<VerticalplaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalplaceholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalplaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepalceComponent } from './createpalce.component';

describe('CreatepalceComponent', () => {
  let component: CreatepalceComponent;
  let fixture: ComponentFixture<CreatepalceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatepalceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatepalceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

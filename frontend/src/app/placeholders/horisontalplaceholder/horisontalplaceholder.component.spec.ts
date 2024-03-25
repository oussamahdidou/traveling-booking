import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorisontalplaceholderComponent } from './horisontalplaceholder.component';

describe('HorisontalplaceholderComponent', () => {
  let component: HorisontalplaceholderComponent;
  let fixture: ComponentFixture<HorisontalplaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorisontalplaceholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorisontalplaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

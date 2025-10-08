import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiraComponent } from './lira.component';

describe('LiraComponent', () => {
  let component: LiraComponent;
  let fixture: ComponentFixture<LiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

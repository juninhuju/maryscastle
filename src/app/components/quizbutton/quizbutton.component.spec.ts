import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizbuttonComponent } from './quizbutton.component';

describe('QuizbuttonComponent', () => {
  let component: QuizbuttonComponent;
  let fixture: ComponentFixture<QuizbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

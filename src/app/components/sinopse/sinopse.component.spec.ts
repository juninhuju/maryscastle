import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinopseComponent } from './sinopse.component';

describe('SinopseComponent', () => {
  let component: SinopseComponent;
  let fixture: ComponentFixture<SinopseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinopseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinopseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

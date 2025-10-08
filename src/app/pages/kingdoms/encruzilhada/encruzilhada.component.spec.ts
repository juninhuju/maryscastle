import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncruzilhadaComponent } from './encruzilhada.component';

describe('EncruzilhadaComponent', () => {
  let component: EncruzilhadaComponent;
  let fixture: ComponentFixture<EncruzilhadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncruzilhadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncruzilhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

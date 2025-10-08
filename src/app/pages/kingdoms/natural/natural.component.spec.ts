import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalComponent } from './natural.component';

describe('NaturalComponent', () => {
  let component: NaturalComponent;
  let fixture: ComponentFixture<NaturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaturalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

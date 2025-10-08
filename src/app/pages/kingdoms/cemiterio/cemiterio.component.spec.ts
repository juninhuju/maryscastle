import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CemiterioComponent } from './cemiterio.component';

describe('CemiterioComponent', () => {
  let component: CemiterioComponent;
  let fixture: ComponentFixture<CemiterioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CemiterioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CemiterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

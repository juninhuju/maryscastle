import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadsPageComponent } from './cads-page.component';

describe('CadsPageComponent', () => {
  let component: CadsPageComponent;
  let fixture: ComponentFixture<CadsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

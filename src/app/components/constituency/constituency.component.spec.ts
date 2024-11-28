import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstituencyComponent } from './constituency.component';

describe('ConstituencyComponent', () => {
  let component: ConstituencyComponent;
  let fixture: ComponentFixture<ConstituencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstituencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstituencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspirantsComponent } from './aspirants.component';

describe('AspirantsComponent', () => {
  let component: AspirantsComponent;
  let fixture: ComponentFixture<AspirantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspirantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspirantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

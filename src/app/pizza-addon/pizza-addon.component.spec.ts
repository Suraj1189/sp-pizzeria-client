import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaAddonComponent } from './pizza-addon.component';

describe('PizzaAddonComponent', () => {
  let component: PizzaAddonComponent;
  let fixture: ComponentFixture<PizzaAddonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaAddonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaAddonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

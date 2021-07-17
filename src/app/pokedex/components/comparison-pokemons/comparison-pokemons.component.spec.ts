import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonPokemonsComponent } from './comparison-pokemons.component';

describe('ComparisonComponentsComponent', () => {
  let component: ComparisonPokemonsComponent;
  let fixture: ComponentFixture<ComparisonPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonPokemonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

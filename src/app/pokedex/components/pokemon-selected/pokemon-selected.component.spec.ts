import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSelectedComponent } from './pokemon-selected.component';

describe('PokemonSelectedComponent', () => {
  let component: PokemonSelectedComponent;
  let fixture: ComponentFixture<PokemonSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonSelectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

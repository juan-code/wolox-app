import { TestBed } from '@angular/core/testing';

import { ComparePokemonsGuard } from './compare-pokemons.guard';

describe('ComparePokemonsGuard', () => {
  let guard: ComparePokemonsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComparePokemonsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SelectionPokemonService } from './selection-pokemon.service';

describe('SelectionService', () => {
  let service: SelectionPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectionPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

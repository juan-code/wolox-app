import { TestBed } from '@angular/core/testing';

import { PaginationPokemonService } from './pagination-pokemon.service';

describe('PaginationService', () => {
  let service: PaginationPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

export const ROOT = {
  main: '',
}
export const POKEMON_ROUTES = {
  main: 'pokedex',
  childrend: {
    compare:'compare-pokemons'
  }
}
export const SIGNINUP_ROUTES = {
  main: 'sign'
}

export const PUBLIC_ROUTES = [
  ROOT.main, SIGNINUP_ROUTES.main
];
export const PRIVATE_R0UTES = [
  POKEMON_ROUTES.main
]
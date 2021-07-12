export function buildImageHero(name:string, size:string = ''): string {
  return `assets/img/${name}/${name}${size ? `@${size}x` : ''}.png`;
}
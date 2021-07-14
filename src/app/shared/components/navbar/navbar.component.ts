import { Component, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StorageService } from '@shared/services';
import { POKEMON_ROUTES, SIGNINUP_ROUTES } from '@shared/constants';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isDown: boolean = false;
  public isOpen: boolean = false;
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly storageService: StorageService,
  ) { }

  get isLogged():boolean {
    return this.storageService.userIsLogged();
  }

  public goTo(fragmet:string = '') {
    this.isOpen = false
    this.document.getElementById(fragmet)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    })
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    const pos = this.document.documentElement.offsetHeight * 3 / 100
    this.isDown = pos < this.document.documentElement.scrollTop
  }

  public toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  public getRoute(): string[] {
    return this.isLogged ? [`/${POKEMON_ROUTES.main}`] : [`/${SIGNINUP_ROUTES.main}`]
  }

  public getTranslationKey(): string {
    return this.isLogged ? 'MENU.POKEDEX' : 'MENU.SING_IN'
  }

  public logout(): void {
    this.storageService.deleteTokenStorage()
  }
}

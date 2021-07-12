import { Component, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isDown: boolean = false;
  public isOpen: boolean = false;
  constructor(
    @Inject(DOCUMENT) private readonly document: Document
  ) { }

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
    console.log(this.isOpen)
  }
}

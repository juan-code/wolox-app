import { Directive, Input, HostBinding, HostListener, AfterViewInit, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DEFAULT_IMAGE } from '@shared/constants';

@Directive({
  selector: 'img[lazy-src]',

})
export class LazyLoadImgDirective implements OnInit, AfterViewInit {

  @HostBinding('attr.src') srcAttr:string | undefined | null = null;
  @Input('lazy-src') src: string | undefined;
  constructor(
    private readonly img: ElementRef,
    private readonly renderer:Renderer2,
  ) { 
    this.renderer.addClass(this.img.nativeElement, 'opacity-full');
  }

  ngOnInit() {
    this.renderer.addClass(this.img.nativeElement, 'opacity-full');
  }
 
  @HostListener('load') onLoad() {
    this.renderer.removeClass(this.img.nativeElement, 'opacity-full');
  }

  @HostListener('error') onError() {
    this.renderer.setAttribute(this.img.nativeElement, 'src', DEFAULT_IMAGE);
  }

  ngAfterViewInit() {
    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          obs.unobserve(this.img.nativeElement);
        }
      });
    });
    obs.observe(this.img.nativeElement);
  }

  private loadImage() {
    this.srcAttr = this.src;
  }
}

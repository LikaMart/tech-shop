import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight = '';
  @Input() highlightColor = '#ffd60a';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    const el = this.el.nativeElement as HTMLElement;
    if (this.appHighlight) {
      this.renderer.setStyle(el, 'background-color', this.highlightColor);
      this.renderer.setStyle(el, 'color', '#0a0a0a');
      this.renderer.setStyle(el, 'border-radius', '3px');
      this.renderer.setStyle(el, 'padding', '0 2px');
    } else {
      this.renderer.removeStyle(el, 'background-color');
      this.renderer.removeStyle(el, 'color');
      this.renderer.removeStyle(el, 'border-radius');
      this.renderer.removeStyle(el, 'padding');
    }
  }
}

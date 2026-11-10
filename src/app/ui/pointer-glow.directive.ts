import { DestroyRef, Directive, ElementRef, NgZone, inject } from '@angular/core';

/**
 * A quiet pointer effect for a board of cards.
 * - The card under the pointer gets `--mx` / `--my` (px), which the stylesheet uses for a soft highlight.
 * - The host gets `--px` / `--py` (-1…1 across the viewport) for small parallax touches.
 * Runs outside Angular and at most once per frame; does nothing on touch devices.
 */
@Directive({
  selector: '[appPointerGlow]',
  standalone: true,
})
export class PointerGlowDirective {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const zone = inject(NgZone);
    const destroyRef = inject(DestroyRef);

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let frame = 0;
    let last: PointerEvent | undefined;

    const paint = (): void => {
      frame = 0;
      if (!last) {
        return;
      }
      host.style.setProperty('--px', ((last.clientX / window.innerWidth) * 2 - 1).toFixed(3));
      host.style.setProperty('--py', ((last.clientY / window.innerHeight) * 2 - 1).toFixed(3));

      const card = last.target instanceof Element ? last.target.closest<HTMLElement>('.card, .tile') : null;
      if (card) {
        const box = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${Math.round(last.clientX - box.left)}px`);
        card.style.setProperty('--my', `${Math.round(last.clientY - box.top)}px`);
      }
    };

    const onMove = (event: PointerEvent): void => {
      last = event;
      frame ||= requestAnimationFrame(paint);
    };

    zone.runOutsideAngular(() => host.addEventListener('pointermove', onMove, { passive: true }));
    destroyRef.onDestroy(() => {
      host.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    });
  }
}

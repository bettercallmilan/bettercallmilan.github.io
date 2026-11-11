import { Component, DestroyRef, ElementRef, NgZone, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const SHY_RADIUS = 85;
const SAFE_DISTANCE = 260;
/** Space the butterfly needs above a card edge so it is fully visible. */
const HEADROOM = 48;

interface Point {
  x: number;
  y: number;
}

/**
 * A butterfly that rests on the top edge of a card and flies to another card
 * when the pointer comes close. It never follows the pointer.
 *
 * While perched it costs nothing: the slow wing movement is a CSS animation.
 * An animation frame loop only runs for the second or so of each flight.
 * With reduced motion it stays where it first lands.
 */
@Component({
  selector: 'app-shy-butterfly',
  standalone: true,
  host: { class: 'shy-butterfly', 'aria-hidden': 'true' },
  template: `
    <svg viewBox="30 70 360 290">
      <path class="sb-wing" d="M205 204C171 120 102 73 61 95c-36 20-16 78 28 110 33 24 74 32 116 25-41 13-72 41-74 76-2 36 42 48 78 23 25-17 37-48 40-84z"/>
      <path class="sb-wing" d="M215 204C249 120 318 73 359 95c36 20 16 78-28 110-33 24-74 32-116 25 41 13 72 41 74 76 2 36-42 48-78 23-25-17-37-48-40-84z"/>
      <g class="sb-body">
        <path d="M204 177c-14-29-29-38-48-42M216 177c14-29 29-38 48-42"/>
        <ellipse cx="210" cy="229" rx="12" ry="62"/>
        <circle cx="210" cy="168" r="13"/>
      </g>
    </svg>
  `,
})
export class ShyButterflyComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Position in page coordinates, so the butterfly scrolls with its card. */
  private position: Point = { x: 0, y: 0 };
  private pointer: Point = { x: -9999, y: -9999 };
  private flying = false;
  private frame = 0;
  private settle = 0;

  constructor() {
    const zone = inject(NgZone);
    const destroyRef = inject(DestroyRef);

    const onMove = (event: PointerEvent): void => {
      this.pointer = { x: event.pageX, y: event.pageY };
      if (this.still || this.flying || !this.host.classList.contains('is-on')) {
        return;
      }
      if (Math.hypot(this.pointer.x - this.position.x, this.pointer.y - this.position.y) < SHY_RADIUS) {
        this.flyTo(this.pickPerch());
      }
    };

    /** Finds a first perch once the page has laid out and its cards have appeared. */
    const land = (delay: number): void => {
      clearTimeout(this.settle);
      cancelAnimationFrame(this.frame);
      this.flying = false;
      this.host.classList.remove('is-on');
      this.settle = window.setTimeout(() => {
        const perch = this.pickPerch();
        if (perch) {
          this.place(perch, 0);
          this.host.classList.add('is-on', 'is-perched');
        }
      }, delay);
    };

    zone.runOutsideAngular(() => {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onMove, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
    });

    function onResize(): void {
      land(400);
    }

    // Every page has different cards, so find a new perch after each navigation.
    const navigation = inject(Router)
      .events.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => zone.runOutsideAngular(() => land(1600)));

    destroyRef.onDestroy(() => {
      navigation.unsubscribe();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      window.removeEventListener('resize', onResize);
      clearTimeout(this.settle);
      cancelAnimationFrame(this.frame);
    });
  }

  private pickPerch(): Point | null {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.card, .tile'))
      .map((card) => card.getBoundingClientRect())
      // Skip cards in the top row and any whose edge is at the very top of the screen:
      // the butterfly sits above the edge and would be cut off there.
      .filter(
        (box) =>
          box.width > 120 &&
          box.top > HEADROOM &&
          box.top + window.scrollY > HEADROOM &&
          box.top < window.innerHeight - 40,
      );
    if (!cards.length) {
      return null;
    }

    let best: Point | null = null;
    let bestDistance = -1;
    for (let attempt = 0; attempt < 14; attempt++) {
      const box = cards[Math.floor(Math.random() * cards.length)];
      const candidate = {
        x: box.left + window.scrollX + 28 + Math.random() * (box.width - 56),
        y: box.top + window.scrollY,
      };
      const fromPointer = Math.hypot(candidate.x - this.pointer.x, candidate.y - this.pointer.y);
      const fromHere = Math.hypot(candidate.x - this.position.x, candidate.y - this.position.y);
      if (fromPointer > SAFE_DISTANCE && fromHere > 160) {
        return candidate;
      }
      if (fromPointer > bestDistance) {
        best = candidate;
        bestDistance = fromPointer;
      }
    }
    return best;
  }

  private place(point: Point, tilt: number): void {
    this.position = point;
    this.host.style.transform = `translate3d(${point.x.toFixed(1)}px, ${point.y.toFixed(1)}px, 0) rotate(${tilt.toFixed(1)}deg)`;
  }

  private flyTo(target: Point | null): void {
    if (!target) {
      return;
    }
    const from = { ...this.position };
    const distance = Math.hypot(target.x - from.x, target.y - from.y);
    const duration = Math.max(750, Math.min(1500, distance * 1.7));
    const lift = Math.min(150, 60 + distance * 0.25);
    const control = {
      x: (from.x + target.x) / 2 + (Math.random() - 0.5) * 80,
      y: Math.min(from.y, target.y) - lift,
    };
    const lean = Math.max(-34, Math.min(34, (target.x - from.x) * 0.12));
    const start = performance.now();

    this.flying = true;
    this.host.classList.remove('is-perched');

    const step = (now: number): void => {
      const raw = Math.min((now - start) / duration, 1);
      const t = raw < 0.5 ? 2 * raw * raw : 1 - (-2 * raw + 2) ** 2 / 2;
      const inverse = 1 - t;
      const point = {
        x: inverse * inverse * from.x + 2 * inverse * t * control.x + t * t * target.x,
        y: inverse * inverse * from.y + 2 * inverse * t * control.y + t * t * target.y,
      };
      // Lean most in the middle of the flight, upright at both ends.
      this.place(point, lean * Math.sin(raw * Math.PI));
      this.host.style.setProperty('--flap', (0.35 + 0.65 * Math.abs(Math.cos((now - start) / 42))).toFixed(3));

      if (raw < 1) {
        this.frame = requestAnimationFrame(step);
      } else {
        this.flying = false;
        this.host.classList.add('is-perched');
      }
    };
    this.frame = requestAnimationFrame(step);
  }
}

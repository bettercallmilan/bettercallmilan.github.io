import { Component, OnDestroy, computed, signal } from '@angular/core';

/**
 * A butterfly drawn in text characters.
 *
 * Nothing here is typed by hand: two wing outlines (left side only; the right
 * side is mirrored) are sampled on a character grid, so the shape can be tuned
 * by editing the paths. A few pre-computed frames with narrower wings give a
 * slow wing beat.
 *
 * The art is rendered twice on top of each other. The upper copy is orange and
 * masked to a small circle around the pointer (see `.ascii-hot` in the stylesheet).
 */
const COLS = 40;
const ROWS = 18;
const VIEW = { x: 30, y: 62, width: 360, height: 290 };
const AXIS = 210;

const FOREWING = 'M206 202C192 124 124 70 62 78C18 86 28 168 80 204C120 228 170 224 206 220Z';
const HINDWING = 'M206 224C162 228 100 240 96 290C92 338 150 348 180 320C198 300 204 270 206 240Z';
const ANTENNAE = 'M204 170c-12-34-28-48-50-54M216 170c12-34 28-48 50-54';

/** Which character draws an edge, keyed by the covered corners: top-left, top-right, bottom-left, bottom-right. */
const EDGE: Record<string, string> = {
  '1000': '`', '0100': "'", '0010': '.', '0001': '.',
  '1100': '"', '0011': '_', '1010': '|', '0101': '|',
  '1001': '\\', '0110': '/',
  '0111': '/', '1011': '\\', '1101': '\\', '1110': '/',
};

/** Edge characters lean the other way on the mirrored wing. */
const MIRRORED: Record<string, string> = { '/': '\\', '\\': '/', '`': "'", "'": '`' };

const near = (x: number, y: number, cx: number, cy: number, radius: number): boolean =>
  (x - cx) ** 2 + (y - cy) ** 2 < radius ** 2;

function render(scale: number): string {
  const context = document.createElement('canvas').getContext('2d');
  if (!context) {
    return '';
  }
  const forewing = new Path2D(FOREWING);
  const hindwing = new Path2D(HINDWING);
  const antennae = new Path2D(ANTENNAE);
  context.lineWidth = 5;

  const cellWidth = VIEW.width / COLS;
  const cellHeight = VIEW.height / ROWS;

  /** Folds a point onto the left side and undoes the wing-beat squeeze. */
  const toLeft = (x: number): number => AXIS - (AXIS - (x <= AXIS ? x : 2 * AXIS - x)) / scale;
  const inFore = (x: number, y: number): boolean => context.isPointInPath(forewing, toLeft(x), y);
  const inHind = (x: number, y: number): boolean => context.isPointInPath(hindwing, toLeft(x), y);
  const inBody = (x: number, y: number): boolean =>
    ((x - AXIS) / 10) ** 2 + ((y - 222) / 62) ** 2 < 1 || near(x, y, AXIS, 160, 12);

  /** Fill character for a point inside a wing. */
  const fill = (x: number, y: number): string => {
    const lx = toLeft(x);
    if (inFore(x, y)) {
      if (near(lx, y, 88, 132, 9)) return '@';
      if (near(lx, y, 88, 132, 24)) return 'o';
      return near(lx, y, 80, 130, 62) ? ':' : '.';
    }
    return near(lx, y, 140, 292, 13) ? 'o' : '=';
  };

  const lines: string[] = [];
  for (let row = 0; row < ROWS; row++) {
    let line = '';
    for (let col = 0; col < COLS; col++) {
      const cx = VIEW.x + (col + 0.5) * cellWidth;
      const cy = VIEW.y + (row + 0.5) * cellHeight;
      const corners = [
        [cx - cellWidth / 4, cy - cellHeight / 4],
        [cx + cellWidth / 4, cy - cellHeight / 4],
        [cx - cellWidth / 4, cy + cellHeight / 4],
        [cx + cellWidth / 4, cy + cellHeight / 4],
      ];

      if (corners.some(([x, y]) => inBody(x, y))) {
        line += '#';
        continue;
      }

      const key = corners.map(([x, y]) => (inFore(x, y) || inHind(x, y) ? '1' : '0')).join('');
      if (key === '1111') {
        line += fill(cx, cy);
      } else if (key !== '0000') {
        const left = cx <= AXIS;
        const char = EDGE[left ? key : key[1] + key[0] + key[3] + key[2]];
        line += left ? char : (MIRRORED[char] ?? char);
      } else if (context.isPointInStroke(antennae, cx, cy)) {
        line += cx <= AXIS ? '\\' : '/';
      } else {
        line += ' ';
      }
    }
    lines.push(line);
  }
  return lines.join('\n');
}

/** Wing widths for the frames, and the order they play in (a pause, then one beat). */
const SCALES = [1, 0.9, 0.76, 0.62];
const BEAT = [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1];

@Component({
  selector: 'app-butterfly',
  standalone: true,
  host: { role: 'img', 'aria-label': 'A butterfly drawn in text characters' },
  template: `
    <pre class="ascii" aria-hidden="true">{{ frame() }}</pre>
    <pre class="ascii ascii-hot" aria-hidden="true">{{ frame() }}</pre>
  `,
})
export class ButterflyComponent implements OnDestroy {
  private readonly frames = SCALES.map(render);
  private readonly step = signal(0);
  private readonly timer = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? undefined
    : setInterval(() => this.step.update((value) => (value + 1) % BEAT.length), 150);

  readonly frame = computed(() => this.frames[BEAT[this.step()]]);

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}

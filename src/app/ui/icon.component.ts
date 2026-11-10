import { Component, computed, input } from '@angular/core';

/**
 * Small stroke icons on a 24px grid, stored as path data only.
 * The github, linkedin, instagram, mail and cloud outlines follow Lucide (ISC licence).
 */
const ICONS = {
  mail: [
    'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7',
  ],
  github: [
    'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    'M9 18c-4.51 2-5-2-7-2',
  ],
  linkedin: [
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z',
    'M2 9h4v12H2z',
    'M2 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  ],
  instagram: [
    'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
    'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z',
    'M17.5 6.5h.01',
  ],
  matrix: ['M6 3H3v18h3', 'M18 3h3v18h-3', 'M8 16v-6', 'M8 12a2 2 0 0 1 4 0v4', 'M12 12a2 2 0 0 1 4 0v4'],
  server: [
    'M5 4h14a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 19 11H5a1.5 1.5 0 0 1-1.5-1.5v-4A1.5 1.5 0 0 1 5 4z',
    'M5 13h14a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5v-4A1.5 1.5 0 0 1 5 13z',
    'M7.5 7.5h.01',
    'M7.5 16.5h.01',
  ],
  layout: ['M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 9h18', 'M9 9v11'],
  terminal: ['M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'm7 9 3 3-3 3', 'M13 15h4'],
  branch: [
    'M3.5 6a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0',
    'M3.5 18a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0',
    'M15.5 8a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0',
    'M6 8.5v7',
    'M18 10.5c0 3.5-3 5-9.5 5.3',
  ],
  cloud: ['M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'],
  check: ['M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'm8.5 12 2.5 2.5 4.5-5'],
  racket: ['M4 20 9.5 14.5', 'M11 13 7 9a4.95 4.95 0 0 1 7-7l3 3a4.95 4.95 0 0 1-7 7Z', 'm15 9 3 3', 'm18 12 3 3-3 3-3-3'],
  tools: ['m14 4 6 6', 'm13 5 6 6', 'M4 20 15 9', 'm3 17 4 4', 'm16 3 5 5'],
  camera: ['M4 7h3l1.5-2h7L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z', 'M12 17a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7Z'],
  printer: ['m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z', 'm4 7.5 8 4.5 8-4.5', 'M12 12v9'],
  plant: ['M12 21V10', 'M12 14c-4 0-6-2-6-6 4 0 6 2 6 6Z', 'M12 11c0-4 2-6 6-6 0 4-2 6-6 6Z', 'M5 21h14'],
} as const;

export type IconName = keyof typeof ICONS;

@Component({
  selector: 'app-icon',
  standalone: true,
  host: { class: 'icon', 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      @for (d of paths(); track d) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly paths = computed(() => ICONS[this.name()]);
}

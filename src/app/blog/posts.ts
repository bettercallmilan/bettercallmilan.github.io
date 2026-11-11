export interface Post {
  slug: string;
  kicker: string;
  title: string;
  date: string;
  summary: string;
}

/** Newest first. */
export const posts: Post[] = [
  {
    slug: '3d-printer',
    kicker: 'making / 3 min read',
    title: 'Learning by making: my first 3D printer',
    date: '27.10.2026',
    summary:
      'Choosing a 3D printer, hitting a clog error 1.6% into the very first print, sending it back, and finally printing a Benchy on the replacement.',
  },
];

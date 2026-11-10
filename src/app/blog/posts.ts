export interface Post {
  /** Route below /blog. */
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
    kicker: 'making / 5 min read',
    title: 'Learning by making: my first 3D printer',
    date: '27.10.2026',
    summary:
      'A first note about getting a 3D printer, figuring out the settings, and learning why making something rarely starts with getting it right.',
  },
];

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/** The slim header card shared by the blog pages. */
@Component({
  selector: 'app-page-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  host: { class: 'card page-bar' },
  template: `
    <a class="wordmark" routerLink="/"><span class="wordmark-mark" aria-hidden="true"></span>milan jankovic</a>
    <nav class="page-nav label" aria-label="Main navigation">
      <a routerLink="/">home</a>
      <a routerLink="/blog" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">blog</a>
      <a href="rss.xml">rss</a>
    </nav>
  `,
})
export class PageBarComponent {}

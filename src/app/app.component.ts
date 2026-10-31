import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="site-header">
      <a class="wordmark" routerLink="/" aria-label="Milan Jankovic home">
        <span>milan · jankovic</span>
      </a>
      <nav class="site-nav" aria-label="Main navigation">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">home</a>
        <a routerLink="/" fragment="work">work</a>
        <a routerLink="/blog" routerLinkActive="active">blog</a>
        <a routerLink="/" fragment="contact">contact</a>
      </nav>
    </header>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}

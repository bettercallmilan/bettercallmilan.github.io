import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PointerGlowDirective } from '../ui/pointer-glow.directive';
import { PageBarComponent } from './page-bar.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [PageBarComponent, PointerGlowDirective, RouterLink],
  template: `
    <div class="read-progress" aria-hidden="true"></div>
    <main class="page" appPointerGlow>
      <app-page-bar style="--i: 0" />

      <header class="card page-hero" style="--i: 1">
        <a class="label go go-back" routerLink="/blog"><b aria-hidden="true">←</b> back to journal</a>
        <h1 class="headline">
          <span class="line"><span>Learning by making:</span></span>
          <span class="line"><span><em>my first 3D printer.</em></span></span>
        </h1>
        <p class="label post-meta"><span>making / 5 min read</span><span>27.10.2026 · Milan Jankovic</span></p>
      </header>

      <article class="card article" style="--i: 2">
        <p class="article-lead">The best way to understand a new tool is to make something with it before you know exactly what you’re doing.</p>
        <p>Getting my first 3D printer felt a little like bringing a tiny workshop home. There was a machine to assemble, software to learn, and a surprising number of ways for a print to go slightly wrong.</p>
        <h2>Start with something small</h2>
        <p>My first prints were deliberately simple. Each one taught me something: how the first layer behaves, how small changes in temperature affect the result, and why patience is part of the process.</p>
        <p>That is what I like about making things physically. The feedback is immediate and honest. A model either fits, moves, or it doesn’t. You adjust, try again, and slowly build a better intuition.</p>
        <h2>Still learning</h2>
        <p>I’m keeping this as an ongoing note rather than a definitive guide. There are still settings to understand, objects to design, and plenty of failed prints to learn from.</p>
      </article>

      <div class="label page-fine page-end">
        <a class="go go-back" routerLink="/blog"><b aria-hidden="true">←</b> all notes</a>
        <button class="to-top label" type="button" (click)="toTop()">back to top ↑</button>
      </div>
    </main>
  `,
})
export class ArticleComponent {
  toTop(): void {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }
}

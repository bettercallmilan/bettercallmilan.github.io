import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RevealDirective, RouterLink],
  template: `
    <main class="page-width article-page">
      <a class="back-link" routerLink="/blog">← back to journal</a>
      <header class="article-header reveal" appReveal>
        <p class="eyebrow">making / 5 min read</p>
        <h1>Learning by making:<br><em>my first 3D printer.</em></h1>
        <p class="article-meta">27.10.2026 · Milan Jankovic</p>
      </header>
      <article class="article-content reveal" appReveal>
        <p class="article-lead">The best way to understand a new tool is to make something with it before you know exactly what you’re doing.</p>
        <p>Getting my first 3D printer felt a little like bringing a tiny workshop home. There was a machine to assemble, software to learn, and a surprising number of ways for a print to go slightly wrong.</p>
        <h2>Start with something small</h2>
        <p>My first prints were deliberately simple. Each one taught me something: how the first layer behaves, how small changes in temperature affect the result, and why patience is part of the process.</p>
        <p>That is what I like about making things physically. The feedback is immediate and honest. A model either fits, moves, or it doesn’t. You adjust, try again, and slowly build a better intuition.</p>
        <h2>Still learning</h2>
        <p>I’m keeping this as an ongoing note rather than a definitive guide. There are still settings to understand, objects to design, and plenty of failed prints to learn from.</p>
      </article>
    </main>
    <footer class="site-footer page-width compact-footer"><div class="footer-bottom"><span>© {{ year }} Milan Jankovic</span><span>made with ❤️ in 🇨🇭</span><a routerLink="/">home ↗</a></div></footer>
  `,
})
export class ArticleComponent {
  readonly year = new Date().getFullYear();
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RevealDirective, RouterLink],
  template: `
    <main class="page-width blog-page">
      <section class="blog-heading reveal" appReveal>
        <p class="eyebrow">journal / 001—</p>
        <div>
          <h1>Notes from<br><em>the margins.</em></h1>
          <p class="blog-intro">A quiet place for observations, experiments, and things I’m still figuring out.</p>
        </div>
      </section>
      <div class="blog-rule"></div>
      <section class="post-list">
        <a class="post placeholder-post reveal" appReveal routerLink="/3d-printer">
          <span class="post-number">01</span>
          <div class="post-copy"><p class="post-kicker">making / 5 min read</p><h2>Learning by making: my first 3D printer</h2><p>A first note about getting a 3D printer, figuring out the settings, and learning why making something rarely starts with getting it right.</p></div>
          <span class="post-status">coming soon <b>✳</b></span>
        </a>
      </section>
    </main>
    <footer class="site-footer page-width compact-footer"><div class="footer-bottom"><span>© {{ year }} Milan Jankovic</span><span>made with ❤️ in Switzerland 🇨🇭</span><a routerLink="/">home ↗</a></div></footer>
  `,
})
export class BlogComponent {
  readonly year = new Date().getFullYear();
}

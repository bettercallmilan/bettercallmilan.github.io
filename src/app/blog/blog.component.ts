import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PointerGlowDirective } from '../ui/pointer-glow.directive';
import { PageBarComponent } from './page-bar.component';
import { posts } from './posts';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [PageBarComponent, PointerGlowDirective, RouterLink],
  template: `
    <main class="page" appPointerGlow>
      <app-page-bar style="--i: 0" />

      <section class="card page-hero" style="--i: 1">
        <p class="label">journal / -</p>
        <h1 class="headline">
          <span class="line"><span>Blog</span></span>
        </h1>
        <p class="page-intro">Collection of ideas, lessons, and observations.</p>
      </section>

      @for (post of posts; track post.slug; let index = $index) {
        <a class="card post-card" [style.--i]="index + 2" [routerLink]="['/blog', post.slug]">
          <span class="label post-meta"><span>{{ post.kicker }}</span><span>{{ post.date }}</span></span>
          <strong>{{ post.title }}</strong>
          <span class="post-summary">{{ post.summary }}</span>
          <span class="label go">read <b aria-hidden="true">→</b></span>
          <span class="layer-stack" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
        </a>
      }

      <p class="label fine page-fine"><span>© {{ year }} Milan Jankovic</span><span>made with ❤️ & 🧉 in 🇨🇭</span></p>
    </main>
  `,
})
export class BlogComponent {
  readonly posts = posts;
  readonly year = new Date().getFullYear();
}

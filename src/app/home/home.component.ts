import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RevealDirective, RouterLink],
  template: `
    <main>
      <section class="hero page-width">
        <div class="hero-copy">
          <h1>Make room<br><em>for better ideas.</em></h1>
          <p class="hero-intro">I’m Milan, a software engineer intern at VZ VermögensZentrum in Zürich, building calm, useful things with Fluent UI and C#.</p>
          <div class="hero-actions">
            <a class="button button-dark" routerLink="/" fragment="work">See my work <span>↘</span></a>
            <a class="text-link" href="mailto:jankovic.milan@proton.me">Say hello <span>↗</span></a>
          </div>
        </div>
        <div class="hero-art" role="img" aria-label="A minimal colorful butterfly" (pointermove)="moveArtwork($event)" (pointerleave)="resetArtwork()" [style.--pointer-x.px]="pointerX" [style.--pointer-y.px]="pointerY">
          <span class="butterfly-glow"></span>
          <span class="art-cursor" aria-hidden="true"></span>
          <svg class="butterfly" viewBox="0 0 420 420" aria-hidden="true">
            <g class="butterfly-wings">
              <path class="wing wing-left" d="M205 204C171 120 102 73 61 95c-36 20-16 78 28 110 33 24 74 32 116 25-41 13-72 41-74 76-2 36 42 48 78 23 25-17 37-48 40-84z"/>
              <path class="wing wing-right" d="M215 204C249 120 318 73 359 95c36 20 16 78-28 110-33 24-74 32-116 25 41 13 72 41 74 76 2 36-42 48-78 23-25-17-37-48-40-84z"/>
            </g>
            <g class="butterfly-body">
              <path class="antenna" d="M204 177c-14-29-29-38-48-42M216 177c14-29 29-38 48-42"/>
              <ellipse cx="210" cy="229" rx="13" ry="65"/>
              <circle cx="210" cy="167" r="14"/>
            </g>
          </svg>
        </div>
      </section>

      <section class="page-width section reveal" id="work" appReveal>
        <div class="section-heading">
          <p class="eyebrow">01 / currently at VZ</p>
          <p class="section-note">A software engineering internship in Zürich.</p>
        </div>
        <div class="work-grid">
          <a class="work-card work-card-featured" href="https://www.vzch.com/" target="_blank" rel="noreferrer">
            <div class="card-image card-image-orange"><span>01</span><strong>VZ<br>team</strong><small>software engineering / Zürich</small></div>
            <div class="card-meta"><span>VZ VermögensZentrum</span><span>intern ↗</span></div>
          </a>
          <a class="work-card" href="https://developer.microsoft.com/en-us/fluentui" target="_blank" rel="noreferrer">
            <div class="card-image card-image-blue"><span>02</span><strong>front<br>end</strong><small>Fluent UI / accessible interfaces</small></div>
            <div class="card-meta"><span>Fluent UI</span><span>what I do ↗</span></div>
          </a>
          <a class="work-card" href="https://dotnet.microsoft.com/en-us/languages/csharp" target="_blank" rel="noreferrer">
            <div class="card-image card-image-yellow"><span>03</span><strong>back<br>end</strong><small>C# / APIs / application logic</small></div>
            <div class="card-meta"><span>C# &amp; .NET</span><span>what I do ↗</span></div>
          </a>
        </div>
        <div class="work-summary">
          <p class="eyebrow">the short version</p>
          <p>I contribute to internal software at VZ: shaping interfaces with Fluent UI, implementing application logic and APIs in C#, and learning how thoughtful software supports real financial work.</p>
        </div>
      </section>

      <section class="about-section reveal" appReveal>
        <div class="page-width about-grid">
          <p class="eyebrow">02 / a little about me</p>
          <div>
            <p class="about-lead">Software should feel as thoughtful as the people using it.</p>
            <p class="about-body">I’m currently interning as a software engineer at VZ VermögensZentrum in Zürich. My day-to-day stack is Fluent UI on the front end and C# on the backend, with plenty of curiosity in between.</p>
            <a class="text-link" routerLink="/blog">Read the blog <span>↗</span></a>
          </div>
        </div>
      </section>

      <section class="page-width experience-section reveal" appReveal>
        <div class="section-heading">
          <p class="eyebrow">03 / experience</p>
          <p class="section-note">A short version of what I’m up to.</p>
        </div>
        <div class="experience-row">
          <span class="experience-date">2025—now</span>
          <div><h2>Software Engineer Intern</h2><p>VZ VermögensZentrum · Zürich</p></div>
          <span class="experience-detail">Fluent UI / C#</span>
        </div>
        <div class="experience-row">
          <span class="experience-date">always</span>
          <div><h2>Learning in public</h2><p>Small experiments, useful notes, better questions.</p></div>
          <span class="experience-detail">web / systems</span>
        </div>
      </section>

      <section class="skills-section reveal" appReveal>
        <div class="page-width skills-grid">
          <p class="eyebrow">04 / things I know</p>
          <div class="skills-content">
            <p class="skills-lead">A practical toolkit, growing every day.</p>
            <div class="skill-groups">
              <div><span class="skill-label">languages</span><p>C# · Python · JavaScript · HTML · CSS · SQL · PowerShell</p></div>
              <div><span class="skill-label">frameworks &amp; tech</span><p>Fluent UI · .NET · ASP.NET Web API · AWS · databases · TCP/IP</p></div>
              <div><span class="skill-label">ways of working</span><p>Git · GitHub · GitLab · VS Code · debugging · code coverage · UX · Scrum</p></div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer page-width" id="contact">
      <div>
        <p class="eyebrow">05 / let’s talk</p>
        <a class="footer-email" href="mailto:jankovic.milan@proton.me">jankovic.milan@proton.me <span>↗</span></a>
        <div class="social-links">
          <a href="https://github.com/bettercallmilan" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/milan--jankovic/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://www.instagram.com/milan.sag/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href="https://matrix.to/#/@mentalfox:envs.net" target="_blank" rel="noreferrer">Matrix ↗</a>
        </div>
      </div>
      <div class="footer-bottom"><span>© {{ year }} Milan Jankovic</span><span>made with ❤️ in 🇨🇭</span><a routerLink="/" fragment="top">back to top ↑</a></div>
    </footer>
  `,
})
export class HomeComponent {
  readonly year = new Date().getFullYear();
  pointerX = 0;
  pointerY = 0;

  moveArtwork(event: PointerEvent): void {
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const bounds = target.getBoundingClientRect();
    this.pointerX = (event.clientX - (bounds.left + bounds.width / 2)) * 0.035;
    this.pointerY = (event.clientY - (bounds.top + bounds.height / 2)) * 0.035;
  }

  resetArtwork(): void {
    this.pointerX = 0;
    this.pointerY = 0;
  }
}

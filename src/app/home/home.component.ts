import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { posts } from '../blog/posts';
import { ButterflyComponent } from '../butterfly/butterfly.component';
import { IconComponent } from '../ui/icon.component';
import { PointerGlowDirective } from '../ui/pointer-glow.directive';
import { contacts, projects, skills } from './content';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButterflyComponent, IconComponent, PointerGlowDirective, RouterLink],
  template: `
    <main class="bento" appPointerGlow>
      <section class="card intro" style="--i: 0">
        <div class="intro-top">
          <p class="wordmark"><span class="wordmark-mark" aria-hidden="true"></span>milan jankovic</p>
        </div>

        <div class="intro-body">
          <h1 class="headline">
            <span class="line"><span>Hey,</span></span>
            <span class="line"><span><em>I'm Milan.</em></span></span>
          </h1>
          <p class="intro-text">
            A software engineer intern at VZ VermögensZentrum in Zürich. I'm mainly learning and working
            with C# and Angular, and I've also worked a bit with Fluent UI.
          </p>
          <div class="intro-actions">
            <a class="text-link go" routerLink="/blog">Blog <b aria-hidden="true">→</b></a>
            <a class="text-link" href="https://github.com/bettercallmilan" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section class="card bfly" style="--i: 1">
        <app-butterfly />
      </section>

      <section class="card about" style="--i: 2">
        <span class="about-mark" aria-hidden="true"></span>
        <p class="label">about me</p>
        <ul class="about-list">
          <li><app-icon name="racket" />former badminton player</li>
          <li><app-icon name="tools" />love crafting and repairing things</li>
          <li><app-icon name="camera" />occasional camera and drone photographer</li>
          <li><app-icon name="printer" />recently got into 3d printing</li>
          <li><app-icon name="plant" />growing two ficus bonsai and seven orchids</li>
        </ul>
      </section>

      <section class="card exp" style="--i: 3">
        <p class="label">experience</p>
        <ul class="rows exp-list">
          <li>
            <span class="label dim">2026—now</span>
            <div><h2>VZ VermögensZentrum</h2><p>software engineer intern</p></div>
            <span class="label tag">work</span>
          </li>
          <li>
            <span class="label dim">2023—2027</span>
            <div><h2>Berufsfachschule BBB</h2><p>computer science</p></div>
            <span class="label tag">education</span>
          </li>
          <li>
            <span class="label dim">2023—2027</span>
            <div><h2>Kantonsschule</h2><p>economics, law, accounting</p></div>
            <span class="label tag">education</span>
          </li>
        </ul>
      </section>

      <div class="plates" style="--i: 4">
        <a class="tile tile-vz" href="https://www.vzch.com/" target="_blank" rel="noreferrer">
          <span class="art art-orbit" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="label go">currently at <b aria-hidden="true">↗</b></span>
          <strong>VZ</strong>
        </a>
        <a class="tile tile-fe" href="https://angular.dev/" target="_blank" rel="noreferrer">
          <span class="art art-window" aria-hidden="true"><i></i><b></b><b></b><u></u></span>
          <span class="label">front end</span>
          <strong>Angular</strong>
        </a>
        <a class="tile tile-be" href="https://dotnet.microsoft.com/en-us/languages/csharp" target="_blank" rel="noreferrer">
          <span class="art art-braces" aria-hidden="true">&#123;&#125;</span>
          <span class="label">back end</span>
          <strong>C#</strong>
        </a>
      </div>

      <section class="card projects" style="--i: 5">
        <p class="label">projects</p>
        <ul class="rows link-rows">
          @for (project of projects; track project.name) {
            <li>
              <a [href]="project.url" target="_blank" rel="noreferrer">
                <strong>{{ project.name }}</strong>
                <span>{{ project.note }}</span>
                <b aria-hidden="true">↗</b>
              </a>
            </li>
          }
        </ul>
      </section>

      <section class="card stack" style="--i: 6">
        <p class="label">skills</p>
        <ul class="skill-list">
          @for (skill of skills; track skill.title) {
            <li>
              <app-icon [name]="skill.icon" />
              <p><b>{{ skill.title }}</b><span>{{ skill.items }}</span></p>
            </li>
          }
        </ul>
      </section>

      <a class="card note" style="--i: 7" [routerLink]="['/blog', post.slug]">
        <span class="label note-top"><span>from the blog</span><span class="go">read <b aria-hidden="true">→</b></span></span>
        <strong>{{ post.title }}</strong>
        <span class="layer-stack" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
      </a>

      <section class="card contact" style="--i: 9" id="contact">
        <p class="label">contact</p>
        <a class="contact-email" href="mailto:jankovic.milan@proton.me">jankovic.milan&#64;proton.me</a>
        <ul class="contact-icons">
          @for (contact of contacts; track contact.label) {
            <li>
              <a [href]="contact.url" [attr.target]="contact.icon === 'mail' ? null : '_blank'" rel="noreferrer" [attr.aria-label]="contact.label" [title]="contact.label">
                <app-icon [name]="contact.icon" />
              </a>
            </li>
          }
        </ul>
        <p class="label fine"><span>© {{ year }} Milan Jankovic</span><span>made with ❤️ & 🧉 in 🇨🇭</span></p>
      </section>
    </main>

    <button class="to-top to-top-home label" type="button" (click)="toTop()">back to top ↑</button>
  `,
})
export class HomeComponent {
  readonly year = new Date().getFullYear();
  readonly post = posts[0];
  readonly projects = projects;
  readonly skills = skills;
  readonly contacts = contacts;

  toTop(): void {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }
}

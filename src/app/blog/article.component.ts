import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { PointerGlowDirective } from "../ui/pointer-glow.directive";
import { PageBarComponent } from "./page-bar.component";

@Component({
  selector: "app-article",
  standalone: true,
  imports: [PageBarComponent, PointerGlowDirective, RouterLink],
  template: `
    <div class="read-progress" aria-hidden="true"></div>
    <main class="page" appPointerGlow>
      <app-page-bar style="--i: 0" />

      <header class="card page-hero" style="--i: 1">
        <a class="label go go-back" routerLink="/blog"
          ><b aria-hidden="true">←</b> back to journal</a
        >
        <h1 class="headline">
          <span class="line"><span>Learning by making:</span></span>
          <span class="line"
            ><span><em>my first 3D printer.</em></span></span
          >
        </h1>
        <p class="label post-meta">
          <span>making / 3 min read</span
          ><span>27.10.2026 · Milan Jankovic</span>
        </p>
      </header>

      <article class="card article" style="--i: 2">
        <p class="article-lead">
          I wanted a printer that just works. The first one didn’t make it past
          1.6% of its first print.
        </p>

        <h2>Picking one</h2>
        <p>
          I started out wanting the
          <a href="https://bambulab.com/en/p2s" target="_blank" rel="noreferrer"
            >Bambu Lab P2S Combo</a
          >. It does everything I need, but it is expensive. I had two hard
          requirements: the printer had to be fully enclosed, because of dust,
          and it needed a filament system that feeds on its own and handles more
          than two spools.
        </p>
        <p>
          That ruled out open-frame printers like the
          <a href="https://bambulab.com/en/a1" target="_blank" rel="noreferrer"
            >Bambu Lab A1</a
          >. I looked at the
          <a
            href="https://www.elegoo.com/products/centauri-carbon-2-combo"
            target="_blank"
            rel="noreferrer"
            >Elegoo Centauri Carbon 2</a
          >
          and the older
          <a href="https://bambulab.com/en/p1" target="_blank" rel="noreferrer"
            >Bambu Lab P1S</a
          >, and went back and forth with Claude on the trade-offs. In the end I
          went for the
          <a
            href="https://eu.anycubic.com/products/kobra-s1-ace-2-pro-combo-3d-printer"
            target="_blank"
            rel="noreferrer"
            >Anycubic Kobra S1 ACE 2 Pro Combo</a
          >: enclosed, four filament slots with drying built in, at roughly half
          the price of the P2S. The catch I accepted was that it is a new
          product without much of a track record, and that the software is less
          polished than Bambu’s.
        </p>

        <h2>Code 11518</h2>
        <p>
          Setup went perfectly fine. Then I started my first print, a small
          shark, and got this:
        </p>
        <figure>
          <svg
            class="sketch"
            viewBox="0 0 720 430"
            role="img"
            aria-label="Line drawing of the printer’s touchscreen showing error code 11518: filament clogging detected, with Resume and Stop buttons. The print is at 1.6%."
          >
            <rect x="40" y="20" width="640" height="360" rx="26" />
            <rect x="92" y="62" width="536" height="262" rx="6" />
            <path d="M150 380v20h420v-20M96 414h528" />

            <rect
              class="sketch-fill"
              x="108"
              y="84"
              width="36"
              height="36"
              rx="9"
            />
            <path d="M118 108l8-12 8 12zM120 111h12" />
            <circle cx="126" cy="160" r="9" />
            <path d="M117 160h18" />
            <path d="M116 206h20M116 216h20M122 202v8M130 212v8" />
            <circle cx="126" cy="266" r="9" />
            <circle cx="126" cy="266" r="3" />

            <text x="360" y="92" text-anchor="middle">
              Shark_PLA_0.2_47m3s.gcode
            </text>
            <path d="M566 84h10v8h-10zM584 84h8v8h-8zM600 84h8v8h-8z" />

            <rect x="548" y="122" width="64" height="26" rx="5" />
            <rect x="548" y="160" width="64" height="26" rx="5" />
            <rect x="548" y="198" width="64" height="26" rx="5" />

            <rect
              class="sketch-paper"
              x="180"
              y="112"
              width="364"
              height="176"
              rx="6"
            />
            <path d="M522 126l8 8M530 126l-8 8" />
            <rect x="198" y="148" width="62" height="62" />
            <path
              d="M204 154h14v14h-14zM240 154h14v14h-14zM204 190h14v14h-14zM226 158h6M226 168h4v6M234 180h8M224 184v10M240 190h6v8h8M248 176v6"
            />
            <text class="sketch-hot" x="278" y="158">CODE: 11518</text>
            <text x="278" y="178">Filament clogging detected,</text>
            <text x="278" y="196">click “resume” to solve it. If</text>
            <text x="278" y="214">failed several times, please</text>
            <text x="278" y="232">stop printing.</text>
            <path d="M180 250h364M362 250v38" />
            <text x="271" y="274" text-anchor="middle">Resume</text>
            <text x="453" y="274" text-anchor="middle">Stop</text>

            <text class="sketch-hot" x="196" y="312">1.6%</text>
            <text x="256" y="312">1/76</text>
            <text x="306" y="312">46m19s</text>
            <rect x="384" y="297" width="66" height="20" rx="4" />
            <path d="M413 302v10l8-5z" />
            <rect x="460" y="297" width="84" height="20" rx="4" />
            <rect
              class="sketch-hot-fill"
              x="497"
              y="302"
              width="10"
              height="10"
            />
          </svg>
          <figcaption class="label">1.6% into the first print</figcaption>
        </figure>
        <p>
          Pressing resume did nothing;
          <a
            href="https://wiki.anycubic.com/en/error-codes/11518-code/s1"
            target="_blank"
            rel="noreferrer"
            >the error</a
          >
          came back every time. There was also red residue on the nozzle and the
          wiper, even though my filament was black. That was probably leftover
          material from testing at the factory.
        </p>

        <h2>Everything I tried</h2>
        <ul>
          <li>Heated the nozzle and extruded manually. Nothing came out.</li>
          <li>
            Took the filament tube off the print head, at which point the
            filament snapped inside and I had to pull the rest out by hand.
          </li>
          <li>
            Opened the front cover of the print head and cleaned the gears and
            the filament path.
          </li>
          <li>
            Did
            <a
              href="https://www.tomshardware.com/3d-printing/how-to-clean-and-unclog-your-3d-printer-nozzle"
              target="_blank"
              rel="noreferrer"
              >cold pulls</a
            >
            at 240 °C and pushed a needle through the nozzle. It was clear.
          </li>
          <li>
            Cleaned everything from the tube down to the nozzle and ran another
            test print. Clogged again.
          </li>
        </ul>
        <p>
          By then the extruder was clicking, and the filament came back out with
          grooves in it. The gear was gripping, but the filament had nowhere to
          go. I found a tension screw and adjusted it, only to realise later
          that I had turned it the wrong way. It probably would not have
          mattered: more pressure would only have cut deeper grooves.
        </p>
        <p>
          I still don’t know what was actually broken. My best guess is the
          filament cutter inside the print head, because new filament got stuck
          a few millimetres after going in.
        </p>

        <h2>The replacement</h2>
        <p>
          I wrote up the fault, sent the printer back and got a replacement.
          That one works perfectly. I also have the feeling it is a newer
          revision of the same model; a few things looked upgraded.
        </p>
        <p>
          The first print on it was a
          <a href="https://www.3dbenchy.com/" target="_blank" rel="noreferrer"
            >Benchy</a
          >, and it came out fine. Since then I have printed random stuff,
          mostly decoration and accessories.
        </p>

        <h2>Still learning</h2>
        <p>
          There are a lot of settings and parameters, and I am still learning
          what most of them do. One thing I did take away: if a brand-new
          printer fails on its very first print and you followed the manual, it
          is probably the printer and not you.
        </p>
      </article>

      <div class="label page-fine page-end">
        <a class="go go-back" routerLink="/blog"
          ><b aria-hidden="true">←</b> all notes</a
        >
        <button class="to-top label" type="button" (click)="toTop()">
          back to top ↑
        </button>
      </div>
    </main>
  `,
})
export class ArticleComponent {
  toTop(): void {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }
}

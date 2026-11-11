import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShyButterflyComponent } from './ui/shy-butterfly.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShyButterflyComponent],
  template: `
    <router-outlet />
    <app-shy-butterfly />
  `,
})
export class AppComponent {}

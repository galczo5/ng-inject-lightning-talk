import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Quick test</h1>
    <p>
      <button routerLink="../">Home page</button>
    </p>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}

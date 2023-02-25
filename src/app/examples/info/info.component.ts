import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  template: `
    <h1>Select what do you want to test:</h1>
    <ul>
      <li>
        <a routerLink="useHostBinding">useHostBinding</a>
      </li>
      <li>
        <a routerLink="useHostListen">useHostListen</a>
      </li>
      <li>
        <a routerLink="useOnChanges">useOnChanges</a>
      </li>
      <li>
        <a routerLink="useOnDestroy">useOnDestroy</a>
      </li>
      <li>
        <a routerLink="useZonelessHostListen">useZonelessHostListen</a>
      </li>
    </ul>
  `,
  styles: [
  ]
})
export class InfoComponent {

}

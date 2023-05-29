import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";

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

  @Input()
  thisMethodNeedChangeDetectionToPassValue!: string;

  @Input()
  thisMethodDoesNotNeedChangeDetectionToPassValue!: Observable<string>;

}

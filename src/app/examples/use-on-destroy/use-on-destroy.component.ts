import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-use-on-destroy',
  template: `
    <div style="display: flex; height: 500px; width: 100%; align-items: center; justify-content: center;">
      useOnDestroy is tested in the rest of the tests :D
    </div>
  `,
  styles: [`
    app-use-on-destroy {
      display: flex;
      border: 1px dashed gray;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class UseOnDestroyComponent {

}

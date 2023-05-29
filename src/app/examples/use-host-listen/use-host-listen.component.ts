import {Component, DoCheck, ViewEncapsulation} from '@angular/core';
import {useHostBinding} from "../../../util/useHostBinding";
import {useOnDestroy} from "../../../util/useOnDestroy";
import {takeUntil} from "rxjs";
import {useHostListen} from "../../../util/useHostListen";

@Component({
  selector: 'app-use-host-listen',
  template: `
    <div style="display: flex; height: 500px; width: 100%; align-items: center; justify-content: center;">
      This block is changing color on mouse enter event
    </div>
  `,
  styles: [`
    app-use-host-listen {
      display: flex;
      border: 1px dashed gray;
    }

    .red {
      background: red;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class UseHostListenComponent implements DoCheck {

  background = useHostBinding('red', false);

  constructor() {
    useHostListen('mouseenter')
      .pipe(
        takeUntil(useOnDestroy())
      )
      .subscribe(() => {
        const oldValue = this.background.get();
        this.background.set(!oldValue);
      });
  }

  ngDoCheck(): void {
    console.log('DoCheck called!');
  }
}

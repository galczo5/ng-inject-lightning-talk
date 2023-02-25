import {Component, DoCheck, ViewEncapsulation} from '@angular/core';
import {useOnDestroy} from "../../../util/useOnDestroy";
import {useHostBinding} from "../../../util/useHostBinding";
import {takeUntil, tap} from "rxjs";
import {useZonelessHostListen} from "../../../util/useZonelessHostListen";

@Component({
  selector: 'app-use-zoneless-host-listen',
  template: `
    <div style="display: flex; height: 500px; width: 100%; align-items: center; justify-content: center;">
      This block is changing color on mouse enter event
    </div>
  `,
  styles: [`
    app-use-zoneless-host-listen {
      display: flex;
      border: 1px dashed gray;
    }

    .red {
      background: red;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class UseZonelessHostListenComponent implements DoCheck {

  private readonly onDestroy$ = useOnDestroy();

  background = useHostBinding('red', false);

  onMouseEnter = useZonelessHostListen('mouseenter')
    .pipe(
      tap(() => {
        const oldValue = this.background.get();
        this.background.set(!oldValue);
      }),
      takeUntil(this.onDestroy$)
    )
    .subscribe();

  ngDoCheck(): void {
    console.log('DoCheck called!');
  }
}

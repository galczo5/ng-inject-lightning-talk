import {Component, DoCheck, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {useHostBinding} from "../../../util/useHostBinding";
import {interval, takeUntil} from "rxjs";
import {useOnDestroy} from "../../../util/useOnDestroy";

@Component({
  selector: 'app-use-host-binding',
  template: `
    <div style="display: flex; height: 500px; width: 100%; align-items: center; justify-content: center;">
      This block is changing color and no change detection is triggered
    </div>
  `,
  styles: [`
    app-use-host-binding {
      display: flex;
      border: 1px dashed gray;
    }

    .red {
      background: red;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class UseHostBindingComponent implements OnInit, DoCheck {

  background = useHostBinding('red', false);

  private readonly onDestroy$ = useOnDestroy();

  constructor(private readonly ngZone: NgZone) {
  }

  ngDoCheck(): void {
    console.log('DoCheck called!');
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      interval(1000)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          const oldValue = this.background.get();
          this.background.set(!oldValue);
        });
    })
  }

}

import {Component, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import {useOnChanges} from "../../../util/useOnChanges";
import {take, takeUntil} from "rxjs";
import {useOnDestroy} from "../../../util/useOnDestroy";
import {useHostBinding} from "../../../util/useHostBinding";

@Component({
  selector: 'app-use-on-changes-child',
  template: `
    This block is changing color on input change.

    Value is: {{ value }}
  `
})
export class UseOnChangesComponentChild implements OnChanges {

  @Input()
  value = false;

  background = useHostBinding('red', false);

  onValueChange = useOnChanges(this, "value")
    .pipe(
      takeUntil(useOnDestroy())
    )
    .subscribe(() => {
      const oldValue = this.background.get();
      this.background.set(!oldValue);
    })

  ngOnChanges(): void {}

}

@Component({
  selector: 'app-use-on-changes',
  template: `
      <div style="display: flex; height: 500px; width: 100%; align-items: center; justify-content: center;">
          <button (click)="value = !value">Toggle</button>
          <app-use-on-changes-child [value]="value"></app-use-on-changes-child>
      </div>
  `,
  styles: [`
    app-use-on-changes {
      display: flex;
      border: 1px dashed gray;
    }

    app-use-on-changes-child {
      display: block;
      margin-left: 20px;
    }

    .red {
      background: red;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class UseOnChangesComponent {

  value = false;

}

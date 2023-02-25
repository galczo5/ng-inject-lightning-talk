import {OnChanges, SimpleChanges} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {useOnDestroy} from "./useOnDestroy";

export function useOnChanges<T extends OnChanges>(component: T, ...input: Array<keyof T>) {
  let originalNgOnChanges = component.ngOnChanges;

  const stream$ = new Subject<void>()
  const wrapper = (changes: SimpleChanges) => {
    const anyChanged = (input as Array<string>)
      .some(i => !!changes[i]);

    if (anyChanged) {
      stream$.next(void 0);
    }

    originalNgOnChanges(changes);
  }

  component.ngOnChanges = wrapper;

  return stream$
    .pipe(
      takeUntil(useOnDestroy())
    );
}

import {ChangeDetectorRef, inject, ViewRef} from "@angular/core";
import {Subject} from "rxjs";

export function useOnDestroy() {
  const onDestroy$ = new Subject<void>();
  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  viewRef.onDestroy(() => {
    onDestroy$.next(void 0);
    onDestroy$.complete();
  })

  return onDestroy$;
}

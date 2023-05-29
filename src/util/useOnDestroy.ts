import {DestroyRef, inject} from "@angular/core";
import {Subject} from "rxjs";

export function useOnDestroy() {
  const onDestroy$ = new Subject<void>();
  // const viewRef = inject(ChangeDetectorRef) as ViewRef;
  const viewRef = inject(DestroyRef);

  viewRef.onDestroy(() => {
    onDestroy$.next(void 0);
    onDestroy$.complete();
  })

  return onDestroy$;
}

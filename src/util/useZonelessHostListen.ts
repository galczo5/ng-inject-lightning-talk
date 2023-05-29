import {ElementRef, inject, NgZone} from "@angular/core";
import {fromEvent, Subject, takeUntil} from "rxjs";
import {useOnDestroy} from "./useOnDestroy";

export function useZonelessHostListen<T extends Event>(eventName: string) {
  const nativeElement = inject(ElementRef).nativeElement;
  const ngZone = inject(NgZone);

  const events$ = new Subject<T>();

  ngZone.runOutsideAngular(() => {
    fromEvent<T>(nativeElement, eventName)
      .pipe(
        takeUntil(useOnDestroy())
      )
      .subscribe(value =>
        events$.next(value)
      );
  });

  return events$.asObservable();
}

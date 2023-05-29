import {ElementRef, inject} from "@angular/core";
import {fromEvent} from "rxjs";

export function useHostListen<T extends Event>(eventName: string) {
  const nativeElement = inject(ElementRef).nativeElement;
  return fromEvent<T>(nativeElement, eventName);
}

import {ElementRef, inject, Renderer2} from "@angular/core";

export function useHostBinding(className: string, enabledByDefault: boolean) {
  const renderer2 = inject(Renderer2);
  const nativeElement = inject(ElementRef).nativeElement;

  let value = enabledByDefault;

  if (value) {
    renderer2.addClass(nativeElement, className);
  }

  return {
    set(newValue: boolean) {
      value = newValue;

      if (value) {
        renderer2.addClass(nativeElement, className);
      } else {
        renderer2.removeClass(nativeElement, className);
      }

    },

    get() {
      return value;
    }

  }
}

import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appRestrictPaste]'
})
export class RestrictPasteDirective {

  @HostListener('paste', ['$event'])
  onPaste(event: any) {
    event.preventDefault();
  }
}

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoStartingZero]'
})
export class NoStartingZeroDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const inputValue: string = this.el.nativeElement.value;
    if (inputValue.startsWith('0') && inputValue !== '0') {
      this.el.nativeElement.value = inputValue.slice(1);
    }
  }

}

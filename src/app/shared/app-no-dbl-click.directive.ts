import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppNoDblClick]'
})
export class AppNoDblClickDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.srcElement.setAttribute('disabled', true);
    setTimeout(function () {
      event.srcElement.removeAttribute('disabled');
    }, 2000);
  }

}

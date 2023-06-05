import {ChangeDetectorRef, Directive} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[restricts]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)': 'onInputChange($event.target.value, true)'
  }
})
export class RestrictDirective {

  constructor(public model: NgControl, private cd: ChangeDetectorRef) {}

}

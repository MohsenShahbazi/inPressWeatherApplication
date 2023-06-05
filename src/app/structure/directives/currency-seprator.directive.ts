import {Directive, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[currency]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)': 'onInputChange($event.target.value, true)'
  }
})
export class CurrencySepratorDirective {

  constructor(public model: NgControl, private cd: ChangeDetectorRef) {}

  @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();


  rawValue: any;

  onInputChange(event: any, backspace: any) {

    this.rawValue = this.formatToSep(event);

    let y = '';
    if (event == null || event == undefined) {
      return event;
    }


    let arr = event.toString().split(',');
    for (let i = 0; i < arr.length; i++) {
      y = y.toString() + arr[i];
    }

    // set the new value
    this.model.valueAccessor.writeValue(this.rawValue);

    this.rawChange.emit(y);

    this.cd.detectChanges();

  }

  formatToSep(valString) {
    if (!valString) {
      return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(',');
    return parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') + (!parts[1] ? '' : ',' + parts[1]);
  };

  unFormat(val) {
    if (!val) {
      return '';
    }
    val = val.replace(/^0+/, '');
    return val.replace(/,/g, '');
  };
}


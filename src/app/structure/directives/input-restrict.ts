import { Directive, HostListener, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[inputRestrict]'
})
export class InputRestrictDirective {

    @Input('inputRestrict') inputType: string;

    showMsg = false;
    pattern: RegExp;

    private regexMap = { // add your own
        number: /^[0-9 ]*$/g,
        float: /^[+-]?([0-9]*[.])?[0-9]+$/g,
        words: /([A-z]*\\s)*/g,
        point25: /^\-?[0-9]*(?:\\.25|\\.50|\\.75|)$/g,
        badBoys: /^[^{}*+£$%\\^-_]+$/g
    };

    constructor(
        public el: ElementRef,
        public renderer: Renderer2) { };

    @HostListener('keypress', ['$event']) onInput(e) {
        this.pattern = this.regexMap[this.inputType]
        const inputChar = e.key;
        this.pattern.lastIndex = 0; // dont know why but had to add this

        if (this.pattern.test(inputChar)) {
            // success
            this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
            this.badBoyAlert('black');
        } else {

            this.badBoyAlert('black');
            //do something her to indicate invalid character
            this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
            e.preventDefault();

        }

    }

    badBoyAlert(color: string) {
        setTimeout(() => {
            this.showMsg = true;
            this.renderer.setStyle(this.el.nativeElement, 'color', color);
        }, 2000)
    }

}

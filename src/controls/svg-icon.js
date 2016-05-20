import {customAttribute, inject} from 'aurelia-framework';

@customAttribute('icon')
@inject(Element)
export class SvgIcon {
    constructor(element) {
        this.element = element;
    }
    
    bind() {
        alert(this.value);
    }
}
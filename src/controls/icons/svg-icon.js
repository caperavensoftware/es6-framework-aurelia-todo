import {customAttribute, inject} from 'aurelia-framework';
import * as icons from './icons.json!json';

@customAttribute('icon')
@inject(Element)
export class SvgIcon {
    constructor(element) {
        this.element = element;
    }
    
    bind() {
        console.log(icons);
        alert(this.value);
    }
}
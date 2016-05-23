import {customAttribute, inject} from 'aurelia-framework';
import * as icons from './icons.json!json';

@customAttribute('icon')
@inject(Element)
export class SvgIcon {
    constructor(element) {
        this.element = element;
        this.element.setAttribute("viewBox", "0 0 32 32");
        this.element.setAttribute("preserveAspectRatio", "xMidYMid meet");
    }
    
    bind() {     
        const nameToSearchFor = this.value;  
        let icon = icons.images.find((image) => {
            return image.name === nameToSearchFor;
        });
        
        if (icon) {
            this.element.innerHTML = icon.data;
        }
    }
}




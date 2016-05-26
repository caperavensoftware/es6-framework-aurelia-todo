import {customElement, useShadowDOM, inject, bindable} from 'aurelia-framework';
import {SvgStore} from './../icons/svg-store';
import 'TweenMax';

@customElement('checkbox')
@useShadowDOM()
@inject(Element, SvgStore)
export class Checkbox {
    @bindable isChecked;
    
    constructor(element, svgStore) {
        this.element = element;
        this.store = svgStore;
    }
    
    attached() {
        let checkedSvg = this.store.findItemByName("checkedon");     
        let uncheckedSvg = this.store.findItemByName("checkedoff");
        
        const checkedSvgString = `<g id="${checkedSvg.name}">${checkedSvg.data}</g>`;
        const uncheckedSvgString = `<g id="${uncheckedSvg.name}">${uncheckedSvg.data}</g>`;
        
        this.svgCheckbox.innerHTML = `${uncheckedSvgString} ${checkedSvgString}`;
        this.checkedImage = this.svgCheckbox.getElementById(checkedSvg.name);
        this.uncheckedImage = this.svgCheckbox.getElementById(uncheckedSvg.name);
    }
    
    detached() {
        this.checkedImage = null;
        this.uncheckedImage = null;
        this.store = null;
        this.element = null;
    }
    
    isCheckedChanged() {
        console.log(this.isChecked);
        console.log(this.checkedImage);
        console.log(this.uncheckedImage);      
//        window.TweenMax.to(this.svgCheckbox, 1, )
//         var endShape = document.getElementById("hippo");
// TweenLite.to("#circle", 1, {morphSVG:endShape});
    }
}
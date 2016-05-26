import {customElement, useShadowDOM, inject, bindable, bindingMode} from 'aurelia-framework';
import {SvgStore} from './../icons/svg-store';
import 'TimelineLite';
import 'MorphSvg';

@customElement('checkbox')
@useShadowDOM()
@inject(Element, SvgStore)
export class Checkbox {
    @bindable({defaultBindingMode: bindingMode.twoWay}) checked;
    
    constructor(element, svgStore) {
        this.element = element;
        this.store = svgStore;
    }
    
    attached() {
        const betweenSvg = this.store.findItemByName("checked-off-on");
        const checkedSvg = this.store.findItemByName("checkedon");     
        const uncheckedSvg = this.store.findItemByName("checkedoff");        

        const betweenSvgString = this.iconToPath(betweenSvg);
        const checkedSvgString = this.iconToPath(checkedSvg);
        const uncheckedSvgString = this.iconToPath(uncheckedSvg);
        
        this.svgCheckbox.innerHTML = `${uncheckedSvgString} ${betweenSvgString} ${checkedSvgString}`;
        
        this.checkedImage = this.svgCheckbox.getElementById(checkedSvg.name);
        this.betweenImage = this.svgCheckbox.getElementById(betweenSvg.name);
        this.uncheckedImage = this.svgCheckbox.getElementById(uncheckedSvg.name);
        
        this.timeline = new window.TimelineLite();
        this.timeline
            .to(this.uncheckedImage, 0.2, {morphSVG:this.betweenImage, opacity: 1})
            .to(this.uncheckedImage, 0.2, {morphSVG:this.checkedImage, ease: Power4.easeOut})
            .pause();
            
        if (this.checked) {
            this.timeline.progress(1);
        }            
    }
        
    iconToPath(icon) {
        if (!icon || icon.data.substring(0, 5) !== '<path') {
            throw "Checkbox.iconToPath expects a path object";
        }
                
        return `${icon.data.slice(0,5)} id="${icon.name}" ${icon.data.slice(6)}`;
    }
    
    detached() {
        this.checkedImage = null;
        this.uncheckedImage = null;
        this.store = null;
        this.element = null;
        this.timeline = null;
    }
    
    checkedChanged() {
        if (!this.timeline) {
            return; // ui not initialized yet but bindings are firing off
        }
        
        if (this.checked) {
            this.timeline.play();
        }
        else {
            this.timeline.reverse();
        }
    }
}
import {customElement, useShadowDOM, bindable, bindingMode} from 'aurelia-framework';

@customElement('switch')
@useShadowDOM()
export class Switch {
    @bindable({defaultBindingMode: bindingMode.twoWay}) checked;
}
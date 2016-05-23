import {customElement, bindable, bindingMode} from 'aurelia-framework';

@customElement('search-input')
export class SearchInput {
    @bindable({defaultBindingMode: bindingMode.twoWay}) text;
}

import {customElement, bindable} from 'aurelia-framework';

@customElement('search-input')
export class SearchInput {
    @bindable text;
}

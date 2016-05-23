import {bindable} from 'aurelia-framework';
import TodoItem from './../models/todoItem';

export class Welcome {
    @bindable searchText;
    @bindable items;
    
    constructor() {
        this.searchText = "search value";
        this.items = [];
        
        this.items.push(new TodoItem("todo", new Date()));
        this.items.push(new TodoItem("todo 2", new Date()));
        this.items.push(new TodoItem("todo 3", new Date()));
    }
    
    addClick() {
        alert('click');
    }
}
import {bindable} from 'aurelia-framework';
import TodoItem from './../models/todoItem';

export class Welcome {
    @bindable searchText;
    @bindable items;
    @bindable model;
    
    constructor() {
        this.searchText = "";
        this.items = [];
        this.backupItems = null;
        
        this.model = new TodoItem();
    }
    
    addClick() {
        let todoItem = new TodoItem(this.model.todo, this.model.date);
        this.items.push(todoItem);
                
        this.model.todo = '';
        this.edtTodo.focus();
    }
    
    searchTextChanged() {
        if (this.backupItems === null) {
            this.backupItems = this.items;
        }
        
        let result = this.backupItems.filter(todoItem => {
            return this.hasFilterString(todoItem.todo) || this.hasFilterString(todoItem.date);
        });
        
        this.items = result;
    }
    
    hasFilterString(value) {
        return value && value.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
    }
}
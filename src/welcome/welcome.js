import {inject, bindable} from 'aurelia-framework';
import TodoItem from './../models/todoItem';

@inject(TodoItem)
export class Welcome {
    @bindable searchText;
    @bindable items;
    @bindable model;
    @bindable disabled;
    
    constructor(todoItem) {
        this.searchText = "";
        this.items = [];
        this.backupItems = null;
                
        this.model = todoItem;           
    }
    
    addClick() {
        if (this.edtTodo.value.length === 0) {
            this.edtTodo.focus();
            return;
        }
        
        if (this.edtDate.value.length === 0) {
            this.edtDate.focus();
            return;
        }

        let todoItem = new TodoItem(this.model.todo, this.model.date);
        this.items.push(todoItem);
                
        this.model.todo = '';
        this.edtTodo.focus();            
    }
    
    searchTextChanged() {
        if (this.searchText.trim().length === 0) {
            if (this.backupItems !== null) {
                this.items = this.backupItems;                
            }
            
            this.disabled = false;
            
            return;
        }
        
        this.disabled = true;
        
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
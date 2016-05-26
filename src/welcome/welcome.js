import {inject, bindable} from 'aurelia-framework';
import TodoItem from './../models/todoItem';
import Ping from './../controls/ping/ping';
import 'TweenMax';

@inject(TodoItem, Ping)
export class Welcome {
    @bindable searchText;
    @bindable items;
    @bindable model;
    @bindable disabled;
    @bindable allSelected;
    
    constructor(todoItem, ping) {
        this.searchText = "";
        this.items = [];
        this.backupItems = null;
        this.ping = ping;        
        this.model = todoItem;     
    }
    
    addClick() {       
        if (this.edtTodo.value.length === 0) {
            this.edtTodo.focus();
            this.ping.pingControl(this.edtTodo);
            return;
        }
        
        if (this.edtDate.value.length === 0) {
            this.edtDate.focus();
            this.ping.pingControl(this.edtDate);
            return;
        }
        
        this.ping.pingControl(this.btnAdd, {color: "white"});        

        let todoItem = new TodoItem(this.model.todo, this.model.date);
        this.items.push(todoItem);
                
        this.model.todo = '';
        this.edtTodo.focus();            
    }
    
    completeSelected() {
        alert('complete');
    }
    
    deleteSelected() {
        alert('delete');
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
    
    allSelectedChanged() {
        for(let item of this.items) {
            item.isSelected = this.allSelected;
        }
    }
    
    hasFilterString(value) {
        return value && value.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
    }
}
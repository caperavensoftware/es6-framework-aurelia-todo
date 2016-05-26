export default class TodoItem {
    constructor(todo, date) {
        this.todo = todo || '';
        this.date = date || '';
        this.isDone = true;
        this.isSelected = true;
    }
}
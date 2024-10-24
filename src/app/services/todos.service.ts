import { Injectable, signal } from '@angular/core';

interface Todo {
  title: string;
  done: boolean;
  description: string;
}

interface StoredTodo extends Todo{
  id: number;
  createdAt: Date;
  finishedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  static id = 1;
  constructor() { }

  private _todos = signal<StoredTodo[]>([]);

  todos = this._todos.asReadonly();

  addTodo(todo: Todo) {
    this._todos.update((v) => [
      ...v,
      this.createStoredTodo(todo)
    ])
  }

  updateTodo(id: number, updatedTodo: Todo | StoredTodo) {
    if( id < 0)
      throw Error(`Wrong todo id to update: ${id}`)

    // const newTodos = structuredClone(this.todos());
    // return newTodos.map()

    this._todos.update((todos) => {
      const idx = todos.findIndex((v) => v.id === id)
      if (idx <0)
        throw Error(`Todo to update not found: ${id}`)

      return todos.map((todo) => (todo.id === id) ? this.createStoredTodo(updatedTodo) : todo)
    })

  }

  private createStoredTodo(todo: Todo): StoredTodo {
    const newTodo = {
      ...todo,
      createdAt: new Date(),
      id: TodosService.id++
    }
    return newTodo;
  }

  cleanAll() {
    this._todos.set([]);
    TodosService.id = 1;
  }

}

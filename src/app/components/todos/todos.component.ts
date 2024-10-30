import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Todo } from '../../modules/Todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todos:Todo[];
  inputTodo:string = "";

  constructor() {
    this.todos = [
      { content: "Test 1", completed: false },
      { content: "Test 2", completed: true }
    ];
  }

  ngOnInit(): void {
    // this.todos = [
    //   { content: "Test 1", completed: false }
    // ];
  }

  toggleDone (id:number) {
    this.todos.map((v, i) => {
      if (i == id) v.completed = !v.completed;

      return v;
    })
  }

  deleteTodo (id:number) {
    this.todos = this.todos.filter((v, i) => i !== id);
  }

  addTodo () {
    this.todos.push({
      content: this.inputTodo,
      completed: false
    });

    this.inputTodo = "";
  }
}

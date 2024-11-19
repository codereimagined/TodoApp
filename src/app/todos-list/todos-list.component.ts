import { Component, inject, OnInit } from '@angular/core';
import { RealTodosService } from '../services/real-todos.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-todos-list',
  imports: [
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatButton,
    MatTableModule,
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent implements OnInit {
  protected readonly todosSvc = inject(RealTodosService);

  protected readonly todos = this.todosSvc.items;

  protected readonly displayedColumns: string[] = ['id', 'item', 'completedAt'];

  todoFormControl = new FormControl('');

  ngOnInit(): void {
    this.todosSvc.fetchItems();
  }

  addTodo() {
    const value = this.todoFormControl.value;

    if (value) {
      console.log('Add Todo', value);
      this.todosSvc.createItem(value).subscribe(() => {
        this.todosSvc.fetchItems();
      });
    }

    this.todoFormControl.reset();
  }
}

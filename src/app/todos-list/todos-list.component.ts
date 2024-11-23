import { Component, inject, ResourceStatus } from '@angular/core';
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
export class TodosListComponent {
  private readonly todosSvc = inject(RealTodosService);

  protected readonly todosResource = this.todosSvc.todosResource;
  protected readonly todoDetailsResource = this.todosSvc.todoDetailsResource;

  // Id to show details for
  protected readonly detailsId = this.todosSvc.todoDetailsId;

  protected readonly displayedColumns: string[] = [
    'id',
    'item',
    'completedAt',
    'delete',
  ];

  protected readonly todoFormControl = new FormControl('');

  addTodo() {
    const value = this.todoFormControl.value;

    if (value) {
      console.log('Add Todo', value);
      this.todosSvc.createItem(value).subscribe(() => {
        //Maybe encapsulate this into service?
        this.todosSvc.todosResource.reload();
      });
    }

    this.todoFormControl.reset();
  }

  deleteTodo(id: string) {
    this.todosSvc.deleteItem(id).subscribe(() => {
      // Maybe encapsulate resource reload into service itself?
      this.todosResource.reload();
    });
  }

  loadDetails(id: string) {
    console.log('Load Details', id);
    this.todosSvc.loadTodoDetails(id);
  }

  protected readonly ResourceStatus = ResourceStatus;
}

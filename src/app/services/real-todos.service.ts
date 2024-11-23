import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay, Observable, of, tap, throwError } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

export interface Item {
  id?: string;
  item: string;
  completedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RealTodosService {
  private apiUrl = `${environment.apiUrl}/todos`; // Base API endpoint

  private readonly http = inject(HttpClient);

  readonly todosResource = rxResource({
    loader: (): Observable<Item[]> => {
      return this.http.get<Item[]>(this.apiUrl).pipe(
        delay(500),
        // tap((items) => {
        //   if (Math.random() > 0.5) throw new Error('Random loading error');
        // }),
      );
    },
  });

  // Id of "to do" to be loaded/shown
  // LinkedSignal to reset to default '' on any change/reload of todos list
  private _todoDetailsId = linkedSignal(() => {
    const todos = this.todosResource.value();
    return '';
  });
  todoDetailsId = this._todoDetailsId.asReadonly();

  readonly todoDetailsResource = rxResource({
    request: this.todoDetailsId,
    loader: ({ request }) => {
      if (!request) return of(undefined);

      return this.http.get<Item>(`${this.apiUrl}/${request}`).pipe(
        delay(500),
        // tap((items) => {
        //   if (Math.random() > 0.5)
        //     throw new Error('Random details loading error');
        // }),
      );
    },
  });

  loadTodoDetails(id: string) {
    this._todoDetailsId.set(id);
  }

  // Create a new item (CREATE operation)
  createItem(item: string): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, { item });
  }

  // Update an existing item (UPDATE operation)
  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item);
  }

  // Delete an item (DELETE operation)
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

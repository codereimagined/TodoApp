import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Item {
  id?: number;
  item: string;
  completedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RealTodosService {
  private apiUrl = `${environment.apiUrl}/todos`; // Base API endpoint

  // Define signals for reactive state management
  private itemsSignal = signal<Item[]>([]);
  private selectedItemSignal = signal<Item | null>(null);

  constructor(private http: HttpClient) {}

  // Getter for the items signal
  get items() {
    return this.itemsSignal.asReadonly();
  }

  // Getter for the selected item signal
  get selectedItem() {
    return this.selectedItemSignal;
  }

  // Get all items (READ operation)
  fetchItems(): void {
    this.http.get<Item[]>(this.apiUrl).subscribe({
      next: (items) => this.itemsSignal.set(items),
      error: (error) => console.error('Error fetching items', error),
    });
  }

  // Get a single item by ID
  fetchItemById(id: number): void {
    this.http.get<Item>(`${this.apiUrl}/${id}`).subscribe({
      next: (item) => this.selectedItemSignal.set(item),
      error: (error) => console.error('Error fetching item', error),
    });
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
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

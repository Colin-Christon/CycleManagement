import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Category {
  categoryId: string;
  categoryName: string;
  description: string;
  totalItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5085/api/category'; // Update with actual backend URL

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${categoryId}`);
  }
}

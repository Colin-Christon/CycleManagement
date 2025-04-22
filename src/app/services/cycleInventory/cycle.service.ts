import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface Cycle {
  cycleId: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  rating: number;
  categoryId: string;
  categoryName: string;
  stock: number;
  isAvailable: boolean;
  imageBase64: string;
  specifications: {
    wheelSize: string;
    description: string;
  }[];
}

export interface ExtendedCycle extends Cycle {
  availableStock: number;
}

@Injectable({
  providedIn: 'root'
})
export class CycleService {
  private apiUrl = 'http://localhost:5085/api/cycles'; 

  constructor(private http: HttpClient,
    private router:Router
  ) {}

  addCycle(cycle: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cycle);

  }

  getCycles(): Observable<Cycle[]> {
    return this.http.get<Cycle[]>(this.apiUrl).pipe(
      map((cycles) => 
        cycles.map(cycle => ({
          ...cycle,
          imageBase64: cycle.imageBase64 
            ? `data:image/png;base64,${cycle.imageBase64}` 
            : '/assets/cycles/mountain.jpg' 
        }))
      ),
      catchError(error => {
        console.error('Error fetching cycles', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }

        return throwError(() => new Error('Failed to load cycles.'));
      })
    );
  }

  
  getCycleById(cycleId: string): Observable<Cycle> {
    return this.http.get<Cycle>(`${this.apiUrl}/${cycleId}`).pipe(
      map(cycle => ({
        ...cycle,
        imageBase64: `data:image/png;base64,${cycle.imageBase64}`,
      }))
    );
  }

  updateCycle(cycle: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cycle.cycleId}`, cycle);
  }

  deleteCycle(cycleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cycleId}`).pipe(
      catchError(error => {
        console.error('Error deleting cycle', error);
        return throwError(() => new Error('Failed to delete cycle.'));
      })
    );
  }
}

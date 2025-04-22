import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>('/api/notifications');
  }

  markAsRead(id: number): Observable<any> {
    return this.http.post(`/api/notifications/mark-read/${id}`, {});
  }
}

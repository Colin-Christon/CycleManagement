import {CommonModule, Location} from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService,Notification } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-admin-headings',
  imports: [CommonModule],
  templateUrl: './admin-headings.component.html',
  styleUrl: './admin-headings.component.scss'
})
export class AdminHeadingsComponent implements OnInit {

  notifications: Notification[] = [];
  unreadCount = 0;
  showDropdown = false;

  constructor( private location: Location,
    private router:Router,
    private notificationService: NotificationService
  ){}

  goBack(){
    this.location.back()
  }

  viewStaff() {
    const userString = sessionStorage.getItem('user');
  
      if (userString) {
        const user = JSON.parse(userString);
        const userId = user.userId;

        this.router.navigate(['/editEmployee', userId]); 
      } else {
        console.error('User not found in sessionStorage');
      }
  }

  ngOnInit() {
    this.fetchNotifications();
    this.notifications = [
      {
        id: 1,
        message: '⚠️ Low stock: Item "Roadster Helmet"',
        isRead: false,
        date: new Date('2025-04-21T09:30:00')
      },
      {
        id: 2,
        message: '🆕 5 new customers registered today',
        isRead: false,
        date: new Date('2025-04-21T18:00:00')
      },
      {
        id: 3,
        message: '✅ Your weekly report was sent successfully',
        isRead: true,
        date: new Date('2025-04-20T17:00:00')
      },
      {
        id: 1,
        message: '⚠️ Low stock: Item "Roadster Helmet"',
        isRead: false,
        date: new Date('2025-04-21T09:30:00')
      },
      {
        id: 2,
        message: '🆕 5 new customers registered today',
        isRead: false,
        date: new Date('2025-04-21T18:00:00')
      },
      {
        id: 3,
        message: '✅ Your weekly report was sent successfully',
        isRead: true,
        date: new Date('2025-04-20T17:00:00')
      }
    ]

    this.unreadCount = this.notifications.filter(n => !n.isRead).length;
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe((data) => {
      this.notifications = data;
      this.unreadCount = data.filter(n => !n.isRead).length;
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  markAsRead(id: number) {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.fetchNotifications(); 
    });
  }
}

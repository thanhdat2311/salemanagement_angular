import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px) translateX(100%)' }),
        animate('50ms ease-out', style({ opacity: 1, transform: 'translateY(0) translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(0) translateX(0)' }))
      ])
    ])
  ]
})
export class NotificationComponent {
  notifications: { id: number; content: string; type: 'info' | 'warning' | 'error' | 'success'}[] = [];

  addNotification(content: string, type: 'info' | 'warning' | 'error' | 'success') {
    const id = Date.now();

    // Nếu đã có 5 thẻ, xóa thẻ cũ nhất
    if (this.notifications.length >= 5) {
      this.notifications.shift();
    }

    this.notifications.push({ id, content, type });

    setTimeout(() => {
      this.removeNotification(id);
    }, 3000);
  }

  removeNotification(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  getHeaderNotification(type: string): string {
    switch (type) {
      case 'info': return 'Infomation';
      case 'warning': return 'Warning';
      case 'error': return 'Error';
      case 'success': return 'Success';
      default: return '';
    }
  }
}

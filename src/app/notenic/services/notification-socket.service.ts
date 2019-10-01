import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationSocket } from '@app/core/socket/notification-socket';

@Injectable({
  providedIn: 'root'
})
export class NotificationSocketService {

  constructor(private socket: NotificationSocket) { }

  joinRoom(): void {
    this.socket.emit('join-room', null);
  }

  getNotifications(): Observable<Notification> {
    return this.socket.fromEvent('new-notification');
  }
}

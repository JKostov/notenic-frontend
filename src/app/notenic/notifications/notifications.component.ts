import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '@notenic/services/notification.service';
import { first, takeUntil } from 'rxjs/operators';
import { Notification } from '@notenic/models';
import { NotificationSocketService } from '@notenic/services/notification-socket.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'note-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[];
  isOpen = false;
  newNotifications = false;
  destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService, private notificationSocketService: NotificationSocketService) { }

  ngOnInit() {
    this.getNotifications();
    this.notificationSocketService.joinRoom();
    this.notificationSocketService.getNotifications().pipe(takeUntil(this.destroy$)).subscribe(val => this.onNewNotification(val));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onChangeDropDown(isOpen: boolean): void {
    this.isOpen = isOpen;
    if (this.newNotifications && isOpen) {
      this.notificationService.seenAll().pipe(first()).subscribe();
      this.newNotifications = false;
    }

    if (!this.isOpen) {
      this.notifications.forEach(n => n.seen = true);
    }
  }

  private getNotifications(): void {
    this.notificationService.getNotifications().pipe(first()).subscribe(val => this.updateNotifications(val));
  }

  private updateNotifications(notifications: Notification[]): void {
    this.notifications = notifications;
    const n = this.notifications.find(not => !not.seen);
    if (n) {
      this.newNotifications = true;
    }
  }

  private onNewNotification(notification: any): void {
    this.isOpen = false;
    this.newNotifications = true;
    this.notifications = [
      notification,
      ...this.notifications,
    ];
  }
}

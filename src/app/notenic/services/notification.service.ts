import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Notification } from '@notenic/models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly http: HttpClient) { }

  public getNotifications(): Observable<Notification[]> {
    const url = `${environment.notificationsApiUrl}/notifications/user`;

    return this.http.get<Notification[]>(url);
  }

  public seenAll(): Observable<any> {
    const url = `${environment.notificationsApiUrl}/notifications/user/seen`;

    return this.http.get<any>(url);
  }
}

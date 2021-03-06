import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FollowUser, UpdateUser, User } from '@notenic/models';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  getUser(username: string): Observable<User> {
    const url = `${environment.apiUrl}/users/${username}`;

    return this.http.get<User>(url);
  }

  updateUser(updateUser: UpdateUser): Observable<User> {
    const url = `${environment.apiUrl}/users`;

    return this.http.post<User>(url, updateUser);
  }

  followUser(followUser: FollowUser): Observable<User> {
    const url = `${environment.apiUrl}/users/follow`;

    return this.http.post<User>(url, followUser);
  }

  getFollowing(): Observable<User[]> {
    const url = `${environment.apiUrl}/users/user/following`;

    return this.http.get<User[]>(url);
  }

  getUserImageData(userId: string): Observable<User> {
    const url = `${environment.apiUrl}/users/${userId}/image-data`;

    return this.http.get<User>(url);
  }

  getUsersLike(query: string): Promise<User[]> {
    const url = `${environment.apiUrl}/users/public/${query}`;

    return this.http.get<User[]>(url).toPromise();
  }
}

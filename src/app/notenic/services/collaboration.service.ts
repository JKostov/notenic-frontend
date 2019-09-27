import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Collaboration } from '@notenic/models/collaboration';
import { Observable } from 'rxjs';
import {CreateCollaboration, UpdateCollaborators, User} from '@notenic/models';

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  constructor(private readonly http: HttpClient) { }

  public createCollaboration(createCollaboration: CreateCollaboration): Observable<Collaboration> {
    const url = `${environment.apiUrl}/collaborations`;

    return this.http.post<Collaboration>(url, createCollaboration);
  }

  public getCollaboration(id: string): Observable<Collaboration> {
    const url = `${environment.apiUrl}/collaborations/${id}`;

    return this.http.get<Collaboration>(url);
  }

  public updateCollaborators(updateCollaborators: UpdateCollaborators): Observable<User[]> {
    const url = `${environment.apiUrl}/collaborations/update/collaborators`;

    return this.http.post<User[]>(url, updateCollaborators);
  }

  public getCollaborations(): Observable<Collaboration[]> {
    const url = `${environment.apiUrl}/collaborations`;

    return this.http.get<Collaboration[]>(url);
  }
}

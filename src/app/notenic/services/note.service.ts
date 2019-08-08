import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CreateNote, DeleteImage, Note, UploadImages } from '@notenic/models';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private readonly http: HttpClient) {
  }

  getFeed(): Observable<Note[]> {
    const url = `${environment.apiUrl}/notes`;

    return this.http.get<Note[]>(url);
  }

  publishNote(createNote: CreateNote): Observable<any> {
    const url = `${environment.apiUrl}/notes`;

    return this.http.post<any>(url, createNote);
  }

  uploadImages(formData: FormData): Observable<UploadImages> {
    const url = `${environment.apiUrl}/images`;

    return this.http.post<UploadImages>(url, formData);
  }

  deleteImage(image: string): Observable<DeleteImage> {
    const url = `${environment.apiUrl}/images/${image}`;

    return this.http.delete<DeleteImage>(url);
  }

  getImageUrl(): string {
    return `${environment.apiUrl}/images/`;
  }
}

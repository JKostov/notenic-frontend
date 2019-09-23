import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CreateNote, CreateNoteComment, DeleteImage, Note, Comment, UploadImages } from '@notenic/models';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private readonly http: HttpClient) {
  }

  public static getImageUrl(): string {
    return `${environment.apiUrl}/images/`;
  }

  getFeed(): Observable<Note[]> {
    const url = `${environment.apiUrl}/notes`;

    return this.http.get<Note[]>(url);
  }

  getNoteByUserAndTitle(user: string, title: string): Observable<Note> {
    const url = `${environment.apiUrl}/notes/${user}/${title}`;

    return this.http.get<any>(url);
  }

  publishNote(createNote: CreateNote): Observable<any> {
    const url = `${environment.apiUrl}/notes`;

    return this.http.post<any>(url, createNote);
  }

  addComment(createNoteComment: CreateNoteComment): Observable<Comment> {
    const url = `${environment.apiUrl}/notes/${createNoteComment.noteId}/comments`;

    return this.http.post<Comment>(url, { markdown: createNoteComment.markdown });
  }

  likeNote(noteId: string, like: boolean): Observable<any> {
    const url = `${environment.apiUrl}/notes/like`;

    return this.http.post<any>(url, { noteId, like });
  }

  uploadImages(formData: FormData): Observable<UploadImages> {
    const url = `${environment.apiUrl}/images`;

    return this.http.post<UploadImages>(url, formData);
  }

  deleteImage(image: string): Observable<DeleteImage> {
    const url = `${environment.apiUrl}/images/${image}`;

    return this.http.delete<DeleteImage>(url);
  }
}

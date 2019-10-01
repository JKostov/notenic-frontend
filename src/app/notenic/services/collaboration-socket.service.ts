import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CollaborationUpdate } from '@notenic/models';
import { CollaborationSocket } from '@app/core/socket/collaboration-socket';

@Injectable({
  providedIn: 'root'
})
export class CollaborationSocketService {

  constructor(private socket: CollaborationSocket) { }

  joinRoom(room: string): Observable<string[]> {
    const subject = new Subject<string[]>();

    this.socket.emit('join-room', room, (data: string[]) => subject.next(data));

    return subject.asObservable();
  }

  leaveRoom(room: string) {
    this.socket.emit('leave-room', room);
  }

  sendUpdate(collaborationUpdate: CollaborationUpdate) {
    this.socket.emit('update', collaborationUpdate);
  }

  sendMerge(collaborationUpdate: CollaborationUpdate) {
    this.socket.emit('merge', collaborationUpdate);
  }

  getMessageWhenUserJoin(): Observable<string> {
    return this.socket.fromEvent('joined');
  }

  getMessageWhenUserLeave(): Observable<string> {
    return this.socket.fromEvent('left');
  }

  getUpdate(): Observable<string> {
    return this.socket.fromEvent('update-collaboration');
  }

  getMerge(): Observable<string> {
    return this.socket.fromEvent('merge-collaboration');
  }
}

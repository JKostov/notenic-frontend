import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '@notenic/services/user.service';
import { User, Notification } from '@notenic/models';
import { first } from 'rxjs/operators';

@Component({
  selector: '[note-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnChanges {
  @Input() notification: Notification;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.notification) {
      this.userService.getUserImageData(this.notification.userId).pipe(first()).subscribe(val => this.user = val);
    }
  }
}

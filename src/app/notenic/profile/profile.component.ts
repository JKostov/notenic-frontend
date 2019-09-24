import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAuthState } from '@notenic/auth/store/auth.state';
import { User } from '@notenic/models';
import { Subject } from 'rxjs';
import { getUser } from '@notenic/auth/store/auth.selectors';
import { first, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IProfileRouteParams } from '@notenic/profile/profile-route-params.interface';
import { UserService } from '@notenic/services/user.service';

@Component({
  selector: 'note-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  loggedUser: User;
  user: User;
  destroy$ = new Subject<void>();

  constructor(private store: Store<IAuthState>, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params: IProfileRouteParams) => {
      const username = params.username;
      this.userService.getUser(username).pipe(first()).subscribe(val => this.user = val);
    });
    this.store.select(getUser).pipe(takeUntil(this.destroy$)).subscribe(val => this.loggedUser = val);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

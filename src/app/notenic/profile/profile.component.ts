import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAuthState } from '@notenic/auth/store/auth.state';
import {FollowUser, User} from '@notenic/models';
import { Subject } from 'rxjs';
import { getUser } from '@notenic/auth/store/auth.selectors';
import { first, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IProfileRouteParams } from '@notenic/profile/profile-route-params.interface';
import { UserService } from '@notenic/services/user.service';
import {FollowUserRequest} from '@notenic/auth/store/auth.actions';

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

  onFollowClick(): void {
    const followUser: FollowUser = { userId: this.user.id };

    if (this.isFollowing()) {
      this.user.followers = this.user.followers.filter(u => u.id !== this.loggedUser.id)
    } else {
      const u = new User();
      u.id = this.loggedUser.id;
      this.user.followers.push(u);
    }

    this.store.dispatch(new FollowUserRequest({ followUser }));
  }

  isFollowing(): boolean {
    if (this.loggedUser && this.user) {
      const res = this.loggedUser.following.find(u => u.id === this.user.id);

      if (res) {
        return true;
      }

      return false;
    }

    return false;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getUser } from '@notenic/./auth/store/auth.selectors';
import { takeUntil } from 'rxjs/operators';
import { IAuthState } from '@notenic/./auth/store/auth.state';
import { LoginSuccess, Logout } from '@notenic/./auth/store/auth.actions';
import { Subject } from 'rxjs';
import { User } from '@notenic/models';
import { AuthService } from '@notenic/services/auth/auth.service';
import { LoadNotesRequest } from '@notenic/store/notenic.actions';

@Component({
  selector: 'note-notenic',
  templateUrl: './notenic.component.html',
  styleUrls: ['./notenic.component.scss']
})
export class NotenicComponent implements OnInit, OnDestroy {
  user: User;
  destroy$ = new Subject<void>();

  constructor(private readonly store: Store<IAuthState>) { }

  ngOnInit() {
    const user = AuthService.getUserFromLocalStorage();
    const token = AuthService.getValidTokenFromLocalStorageOrClear();
    if (token) {
      this.store.dispatch(new LoginSuccess({ loginSuccessModel: { token, user } }));
    }
    this.store.pipe(select(getUser), takeUntil(this.destroy$)).subscribe(val => this.user = val);

    this.store.dispatch(new LoadNotesRequest());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onLogoutClick(): void {
    this.store.dispatch(new Logout());
  }

}

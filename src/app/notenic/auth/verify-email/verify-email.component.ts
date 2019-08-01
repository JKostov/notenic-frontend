import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAuthState } from '../store/auth.state';
import { VerifyEmailFail, VerifyEmailRequest } from '../store/auth.actions';

@Component({
  selector: 'note-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  private static Token = 'token';
  destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute, private readonly store: Store<IAuthState>, private readonly router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params[VerifyEmailComponent.Token]) {
        const token = params[VerifyEmailComponent.Token];

        this.store.dispatch(new VerifyEmailRequest({ token }));
      } else {
        this.store.dispatch(new VerifyEmailFail({ error: 'Invalid token' }));
      }
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

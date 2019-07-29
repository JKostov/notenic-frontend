import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenInterceptor } from '@notenic/services/auth/token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem(TokenInterceptor.AuthToken);

    if (token) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}

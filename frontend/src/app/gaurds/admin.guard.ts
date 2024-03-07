import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if user is an admin
    return this.authService.$IsAdmin.pipe(
      take(1), // take only one value from the observable
      map(isAdmin => {
        if (isAdmin) {
          return true; // Allow access to the route if user is an admin
        } else {
          // If not an admin, redirect to some other route or show an error
          this.router.navigate(['/auth/login']); // Redirect to not authorized page
          return false;
        }
      })
    );
  }
}

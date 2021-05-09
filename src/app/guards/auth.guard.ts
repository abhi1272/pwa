import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { AuthService } from '../modules/auth/services/auth.service'


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(): boolean {
        const currentUser = this.authService.currentUserValue
        if (currentUser) {
            return true
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'])
        return false
    }
}

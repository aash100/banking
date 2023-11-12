import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginGuardService implements CanActivate {
    constructor(public router: Router, private cookieService: CookieService) {
    }

    canActivate(): boolean {
        if (this.isAuthenticated()) {
            this.router.navigate(['/home']);
            return false;
        } else {
            return true;
        }
    }

    isAuthenticated() {
        return this.cookieService.get('authToken');

        // return (sessionStorage.getItem('auth-token'));
    }
}

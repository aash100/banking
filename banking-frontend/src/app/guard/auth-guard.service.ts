import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {Location} from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthGuardService implements CanActivate {
    
    
    constructor(public location: Location, public router: Router, private cookieService: CookieService) {
    }

    canActivate(): any {
        if (!this.isAuthenticated()) {
            return this.router.navigate(['/login']);
            // return false;
        } else {
            return true;
        }
    }

    isAuthenticated() {
        return this.cookieService.get('authToken');

        // return (sessionStorage.getItem('auth-token'));
    }
    
    setAuthorizationToken(authToken: string){
        const expireTime: Date = new Date();
        expireTime.setMinutes( expireTime.getMinutes() + 5);
        this.cookieService.set('authToken', authToken, { expires: expireTime, sameSite: 'Lax' });
    }

    getAuthorizationToken(): string  {
        return this.cookieService.get('authToken');
    }

}

import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGuardService } from '../guard/auth-guard.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthGuardService, private router: Router, private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();
    
    let headers = req.headers;
    if(!req.url.includes('/api/users')){
      if(!authToken){
        this.snackBar.open('Session Expired: Logged out successfully','', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'error-snackbar',
          duration:3000
        });
        this.router.navigate(['/login']);
      }else{
        headers= req.headers.append('Authorization','Bearer '+ authToken);
      }
    }    
    const authReq = req.clone({
          headers: headers
    });
    return next.handle(authReq);
  }
}

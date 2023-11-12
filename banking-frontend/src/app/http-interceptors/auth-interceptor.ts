import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGuardService } from '../guard/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthGuardService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    // let headers=req.headers.append('Access-Control-Allow-Origin' , '*').append('Access-Control-Allow-Headers','Content-Type').append('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
    //     const options = {headers};

    // let headers = req.headers.append('Access-Control-Allow-Origin' , 'http://localhost:4200').append('Access-Control-Allow-Headers','Content-Type').append('Access-Control-Allow-Methods','*')
    let headers = req.headers;
    if(!req.url.includes('/api/users')){
      headers= req.headers.append('Authorization','Bearer '+ authToken);
    }    
    const authReq = req.clone({
          headers: headers
    });
    // const authReq = req.clone({ setHeaders: { Authorization: authToken} });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}

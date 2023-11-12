import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError, BehaviorSubject, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';
import { Constant } from '../constant';
import { AuthGuardService } from '../guard/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  LoginUrl = environment.apiUrl + '/users/login';
    UserUrl = environment.apiUrl + '/users/register';
    userDetails = environment.apiUrl + 'dashboard/user';

    private _refreshNeeded$ = new Subject<void>();
    public name = new Subject<string>();
    public accountNumber = new Subject<string>();
    
    refresh = new EventEmitter();
    
        
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
    ) {
    }

    get refreshNeeded$() {
        return this._refreshNeeded$;
    }

    loginCall(loginDetails: any) {
        return this.http.post(this.LoginUrl, loginDetails).pipe(catchError(error => this.handleError(error)));
    }

    private handleError(error: HttpErrorResponse) {
        if (error && error['error'] && error['error']['message'] === 'Unauthorized') {
            this.toastr.error('Invalid username or password.');
            return throwError(error);
        }
        return throwError(this.toastr.error(error['error']['message']));

    }

    onFetchProfile() {
        let header = new HttpHeaders({'Content-Type': 'application/json', 'Accept':'application/json'});
        
        // header = header.append('Authorization', 'Bearer '+ this.authService.getAuthorizationToken());
    //   headers.append('Authorization','Bearer '+ authToken);

        return this.http.get(Constant.userDetails, {headers: header}).pipe(catchError(error => this.handleError(error)));
    }

    onUpdateProfile(userDetails: { dob: string; name: string; email: string }) {
        let headers = new HttpHeaders();
        // headers = headers.append('token', this.token);
        const options = {headers};
        return this.http.put(this.UserUrl, userDetails, options).pipe(tap(() => {
            this.refreshNeeded$.next();
        }), catchError(error => this.handleError(error)));
    }

    onRegister(userDetails: any) {
        let headers = new HttpHeaders();
        // headers=headers.append('Access-Control-Allow-Origin' , '*').append('Access-Control-Allow-Headers','Content-Type').append('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
        const options = {headers};
        return this.http.post(this.UserUrl, userDetails);
    }

    onGetAccount() {
        return this.http.get(Constant.accountUrl).pipe(catchError(error => this.handleError(error)));
    }

    transferMoney(transferDetails: any) {
        return this.http.post(Constant.transferUrl, transferDetails).pipe(catchError(error => this.handleError(error)));
    }

    withdrawMoney(transferDetails: any) {
        return this.http.post(Constant.withdrawUrl, transferDetails).pipe(catchError(error => this.handleError(error)));
    }

    depositMoney(transferDetails: any) {
        return this.http.post(Constant.depositUrl, transferDetails).pipe(catchError(error => this.handleError(error)));
    }

    getTransactions() {
        return this.http.get(Constant.trasactionUrl).pipe(catchError(error => this.handleError(error)));
    }
}

import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError, BehaviorSubject, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';
import { Constant } from '../constant';
import { AuthGuardService } from '../guard/auth-guard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        private snackBar: MatSnackBar
    ) {
    }

    get refreshNeeded$() {
        return this._refreshNeeded$;
    }

    loginCall(loginDetails: any) {
        return this.http.post(this.LoginUrl, loginDetails).pipe(catchError(error => this.handleError(error)));
    }

    private handleError(error: HttpErrorResponse) {
        console.log('error', error);
        if (error && error['error'] ) {
            let errorMsg='';
            if(typeof error['error']!== 'string'){
                errorMsg=error['error']['errorMsg'];
            }else{
                errorMsg=error['error'];
            }
            this.snackBar.open(errorMsg,'', {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: 'error-snackbar',
                duration:5000
            });
            return throwError(error);
        }
        return throwError(this.snackBar.open('Failed Operations','', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'error-snackbar',
            duration:5000
        }));

    }

    onFetchProfile() {
        return this.http.get(Constant.userDetails).pipe(catchError(error => this.handleError(error)));
    }

    onUpdateProfile(userDetails: { dob: string; name: string; email: string }) {
        return this.http.put(this.UserUrl, userDetails).pipe(tap(() => {
            this.refreshNeeded$.next();
        }), catchError(error => this.handleError(error)));
    }

    onRegister(userDetails: any) {
        return this.http.post(this.UserUrl, userDetails).pipe(catchError(error => this.handleError(error)));
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Subject} from 'rxjs';
import { Constant } from '../constant';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

    public name = new Subject<string>();
    public accountNumber = new Subject<string>();
    
    public refresh = new Subject<string>();
    
        
    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) {
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
                horizontalPosition: 'center',
                panelClass: 'error-snackbar',
                duration:3000
            });
            return throwError(error);
        }
        return throwError(this.snackBar.open('Failed Operations','', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'error-snackbar',
            duration:3000
        }));

    }

    login(loginDetails: any) {
        return this.http.post(Constant.login, loginDetails).pipe(catchError(error => this.handleError(error)));
    }

    

    fetchUserDetails() {
        return this.http.get(Constant.userDetails).pipe(catchError(error => this.handleError(error)));
    }

    registerUser(userDetails: any) {
        return this.http.post(Constant.registerUser, userDetails).pipe(catchError(error => this.handleError(error)));
    }

    getAccountDetails() {
        return this.http.get(Constant.account).pipe(catchError(error => this.handleError(error)));
    }

    transferMoney(transferDetails: any) {
        return this.http.post(Constant.transfer, transferDetails).pipe(catchError(error => this.handleError(error)));
    }

    withdrawMoney(transferDetails: any) {
        return this.http.post(Constant.withdraw, transferDetails).pipe(catchError(error => this.handleError(error)));
    }

    depositMoney(transferDetails: any) {
        return this.http.post(Constant.deposit, transferDetails).pipe(catchError(error => this.handleError(error)));
    }

    getTransactions() {
        return this.http.get(Constant.transactions).pipe(catchError(error => this.handleError(error)));
    }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BankingService } from '../services/banking.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthGuardService } from '../guard/auth-guard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm : FormGroup = new FormGroup({
    // userId: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]),
    email: new FormControl(null, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });
  responseReceived: boolean = false;
  constructor(private router: Router, private service: BankingService, private authService: AuthGuardService,
    private snackBar: MatSnackBar){}

  login() {
    this.responseReceived = false;
    const loginDetails = {
      // userId: this.loginForm.value.userId,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    console.log(loginDetails);
    this.service.loginCall(loginDetails).subscribe(
      (response:any) => {
        if(response.successMsg){
          let token = response.data
          this.responseReceived = true;
          this.authService.setAuthorizationToken(token);
          this.snackBar.open(response.successMsg,'', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'success-snackbar',
            duration:5000
          });
          this.router.navigate(['/home']);
        }
          
      },
      (error: HttpErrorResponse) => {
          this.responseReceived = true
      }
    );
}

}

export enum ToasterPosition {
  topRight = 'toast-top-right',
  topLeft = 'toast-top-left',
  bottomRight = 'toast-bottom-right',
  bottomLeft= 'toast-bottom-left',
  // Other positions you would like
}

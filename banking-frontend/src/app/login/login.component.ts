import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BankingService } from '../services/banking.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthGuardService } from '../guard/auth-guard.service';
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
  constructor(private router: Router, private service: BankingService, private toastrService: ToastrService, private authService: AuthGuardService){}

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
          this.responseReceived = true;
          console.log('response-body: ', response);
          this.authService.setAuthorizationToken(response['token']);
          // sessionStorage.setItem('auth-token', response['token']);
          // sessionStorage.setItem('userName', response['user']['name']);
          // sessionStorage.setItem('contactNo', response['user']['contactno']);
          this.toastrService.success('Login Successful', 'success');
          // this.toastr.success('Login Successful');
          this.service.onFetchProfile().subscribe((response:any)=>{
            console.log(response);
            this.service.name.next(response['name']);
          });
          this.router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => {
          this.responseReceived = true
      }
    );
    // setTimeout(()=>{
    //   this.service.onFetchProfile().subscribe((response:any)=>{
    //     console.log(response);
    //   });
    // },5000);
}

}

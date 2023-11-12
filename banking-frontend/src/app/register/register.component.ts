import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// import {ServiceService} from '../services/service.service';
// import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BankingService } from '../services/banking.service';
import { MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    // emailPattern: String ='^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
    // contactNoPattern: String = '^[6,7,8,9]{1}[0-9]{10}$';
    // pinPattern: string;
    formValid: boolean = true;

    registerForm = new FormGroup(
      {
          name: new FormControl(null, Validators.required),
          email: new FormControl(null, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')]),
          contactNo: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern('^[6,7,8,9]{1}[0-9]{10}$')]),
          password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
          dob: new FormControl(null, Validators.required),
          address: new FormControl(null, Validators.required),
          pin: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]{4}$')])

      }
    );
    date_of_birth :any ='';

    constructor(
        private service: BankingService,
        private toastr: ToastrService,
        private router: Router
    ) {
    }


    submitForm() {
        const userDetails = {
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            contactNo: this.registerForm.value.contactNo,
            password: this.registerForm.value.password,
            address: this.registerForm.value.address,
            dob: this.registerForm.value.dob? this.registerForm.value.dob['year'] + '-'
                + (this.registerForm.value.dob['month'] < 10 ? '0' + this.registerForm.value.dob['month'] : this.registerForm.value.dob['month']) + '-'
                + (this.registerForm.value.dob['day'] < 10 ? '0' + this.registerForm.value.dob['day'] : this.registerForm.value.dob['day']):''

        };
        const obj ={userDetails:userDetails, pin: this.registerForm.value.pin}
        this.service.onRegister(obj).subscribe(
            (response : any) => {
                this.router.navigate(['/login']);
                this.toastr.success(response['message']);
            }
        );
    }

    get u() {
        return this.registerForm.controls;
    }
}

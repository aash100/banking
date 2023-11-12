import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BankingService } from '../services/banking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
  depositForm = new FormGroup(
    {
      amount: new FormControl(null, Validators.required),
      pin: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]{4}$')]),
    });
  accountNumber = '';

    constructor(
        private service: BankingService,
        private snackBar: MatSnackBar,
    ) {
      // this.service.accountNumber.subscribe(val=>this.accountNumber = val);
    }

    depositFormSubmit() {
        const transferDetails = {
            amount: this.depositForm.value.amount,
            pin: this.depositForm.value.pin
        };
        this.service.depositMoney(transferDetails).subscribe(
            (response: any) => {
              if(response.successMsg){
                this.service.refresh.emit('transfer');
                  this.snackBar.open(response.successMsg,'', {
                      verticalPosition: 'top',
                      horizontalPosition: 'right',
                      panelClass: 'success-snackbar',
                      duration:5000
                  });
              }
            }
        )
    }
}

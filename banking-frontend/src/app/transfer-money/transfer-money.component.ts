import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { BankingService } from '../services/banking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-transfer-money',
    templateUrl: './transfer-money.component.html',
    styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent {
  transferMoneyForm = new FormGroup(
    {
        transferTo: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
        pin: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]{4}$')]),
    });

    constructor(
        private service: BankingService,
        private snackBar: MatSnackBar,
    ) {
    }

    transferMoneyFormSubmit() {
        const transferDetails = {
            targetAccountNumber: this.transferMoneyForm.value.transferTo,
            amount: this.transferMoneyForm.value.amount,
            pin: this.transferMoneyForm.value.pin
        };
        this.service.transferMoney(transferDetails).subscribe(
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

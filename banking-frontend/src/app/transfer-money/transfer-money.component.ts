import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { BankingService } from '../services/banking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-transfer-money',
    templateUrl: './transfer-money.component.html',
    styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit{
  transferMoneyForm = new FormGroup(
    {
        transferTo: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        amount: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
        pin: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]{4}$')]),
    });

    constructor(
        private service: BankingService,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        this.transferMoneyForm = new FormGroup(
            {
                transferTo: new FormControl(null, [Validators.required, Validators.minLength(8)]),
                amount: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
                pin: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]{4}$')]),
            });
    }
    transferMoneyFormSubmit() {
        const transferDetails = {
            targetAccountNumber: this.transferMoneyForm.value.transferTo,
            amount: this.transferMoneyForm.value.amount,
            pin: this.transferMoneyForm.value.pin
        };
        this.service.transferMoney(transferDetails).subscribe(
            (response: any) => {
                this.transferMoneyForm.reset();
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

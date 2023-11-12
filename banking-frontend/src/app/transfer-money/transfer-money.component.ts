import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { BankingService } from '../services/banking.service';

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
        private toastr: ToastrService,
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
                this.service.refresh.emit('transfer');
                this.toastr.success(response['msg']);
            }
        )
    }
}

import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { BankingService } from '../services/banking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utility } from '../shared/utils/utility.component';

@Component({
    selector: 'app-transfer-money',
    templateUrl: './transfer-money.component.html',
    styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit{

    sourceAccountNumber: string ='';
    error={isSourceAndTargetSame : false};

    transferMoneyForm = new FormGroup(
        {
            transferTo: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            amount: new FormControl(null, [Validators.required, Validators.max(100000), Validators.min(1)]),
            pin: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]{4}$')]),
        }
    );

    constructor(
        private service: BankingService,
        private snackBar: MatSnackBar,
    ) {
        this.service.accountNumber.subscribe((value)=>{
            this.sourceAccountNumber = value;
        });
        this.service.refresh.subscribe((event)=>{if(event==='form-reset'){ Utility.resetForm(this.transferMoneyForm); }});

    }

    ngOnInit(): void {
        this.transferMoneyForm = new FormGroup(
            {
                transferTo: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]+$')]),
                amount: new FormControl(null, [Validators.required, Validators.max(100000), Validators.min(1), Validators.pattern('^[1-9][0-9]*$')]),
                pin: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]{4}$')]),
            }
        );
        this.transferMoneyForm.controls.transferTo.valueChanges.subscribe(value => {
            if(value===this.sourceAccountNumber){
                this.transferMoneyForm.controls.transferTo.setErrors({'isSourceAndTargetSame': true});
            }
        });
        // this.transferMoneyForm.controls.amount.valueChanges.subscribe((value : any) => {
        //     console.log('value', value);
        //     if(value?.toString().startsWith('0')){
        //         this.transferMoneyForm.controls.amount.setErrors({'zeroValue': true});
        //     }
        // });
    }
    transferMoneyFormSubmit() {
        const transferDetails = {
            targetAccountNumber: this.transferMoneyForm.value.transferTo,
            amount: this.transferMoneyForm.value.amount,
            pin: this.transferMoneyForm.value.pin
        };
        this.service.transferMoney(transferDetails).subscribe(
            (response: any) => {
                Utility.resetForm(this.transferMoneyForm);
                if(response.successMsg){
                    this.service.refresh.next('transfer');
                    this.snackBar.open(response.successMsg,'', {
                        verticalPosition: 'top',
                        horizontalPosition: 'center',
                        panelClass: 'success-snackbar',
                        duration:3000
                    });
                }
            }
        )
    }
}




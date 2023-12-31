import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BankingService } from '../services/banking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utility } from '../shared/utils/utility.component';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {
    withdrawalForm = new FormGroup(
    {
        amount: new FormControl(null, [Validators.required,Validators.max(100000), Validators.min(1)]),
        pin: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]{4}$')]),
    });

    constructor(private service: BankingService, private snackBar: MatSnackBar) {
      this.service.refresh.subscribe((event)=>{
        if(event==='form-reset'){
            Utility.resetForm(this.withdrawalForm);
        }
    });
    }
    ngOnInit(): void {
        this.withdrawalForm = new FormGroup(
            {
                amount: new FormControl(null, [Validators.required,Validators.max(100000), Validators.min(1)]),
                pin: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]{4}$')]),
            }
        );
    }

    withdrawalFormSubmit() {
        const transferDetails = {
            amount: this.withdrawalForm.value.amount,
            pin: this.withdrawalForm.value.pin
        };
        this.service.withdrawMoney(transferDetails).subscribe(
            (response: any) => {
                Utility.resetForm(this.withdrawalForm);
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

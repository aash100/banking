import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BankingService } from '../services/banking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utility } from '../shared/utils/utility.component';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit, OnDestroy{
    depositForm = new FormGroup(
      {
        amount: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
        pin: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]{4}$')]),
      }
    );
    browserRefresh: boolean = false;
    private depositMoneySubscription: Subscription = new Subscription;
    constructor(private service: BankingService, private snackBar: MatSnackBar, private router: Router) {
      this.service.refresh.subscribe((event)=>{ if(event==='form-reset'){ Utility.resetForm(this.depositForm); }});
      
     }
    ngOnDestroy(): void {
      this.depositMoneySubscription.unsubscribe();
    }
    
    ngOnInit(){

      this.depositForm = new FormGroup(
        {
          amount: new FormControl(null, [Validators.required, Validators.max(100000), Validators.min(1)]),
          pin: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('[0-9]{4}$')]),
        }
      );
    }

    depositFormSubmit() {
        const transferDetails = {
            amount: this.depositForm.value.amount,
            pin: this.depositForm.value.pin
        };
        this.depositMoneySubscription = this.service.depositMoney(transferDetails).subscribe(
            (response: any) => {
              Utility.resetForm(this.depositForm);
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

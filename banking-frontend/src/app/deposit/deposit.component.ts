import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BankingService } from '../services/banking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    subscription: Subscription;
    private depositMoneySubscription: Subscription = new Subscription;
    constructor(private service: BankingService, private snackBar: MatSnackBar, private router: Router) {
      this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
           this.browserRefresh = !router.navigated;
        }
      });
     }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
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
              this.depositForm.reset();
              // this.depositForm.value.amount = undefined;
              // this.depositForm.value.pin = undefined;
              if(response.successMsg){
                this.service.refresh.emit('transfer');
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

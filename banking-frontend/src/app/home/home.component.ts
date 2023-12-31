import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute,Router, RouterLinkActive, Routes } from '@angular/router';
import { BankingService } from '../services/banking.service';
import { AuthGuardService } from '../guard/auth-guard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    constructor(private router: Router, private service: BankingService, private auth: AuthGuardService, private snackBar: MatSnackBar){

    }

    ngOnInit(): void {
      this.service.fetchUserDetails().subscribe((response:any)=>{
        if(response.successMsg){
          this.service.name.next(response.data['name']);
        }
      });
      
    }

    selectedTabValue($event: any) {
        if(this.auth.getAuthorizationToken()){
          this.service.refresh.next('form-reset');
        }else{
          this.router.navigate(['/login']);
          this.snackBar.open('Session Expired: Logged out successfully','', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: 'error-snackbar',
              duration:3000
          });
        }

    }
}

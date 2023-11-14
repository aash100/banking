import {Component, OnInit} from '@angular/core';
import { BankingService } from '../services/banking.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    columns = [
        { columnDef: 'accountNumber', header: 'Account Number' },
        { columnDef: 'name',     header: 'Name' },
        { columnDef: 'balance',   header: 'Available Balance'},
      ];
    
    displayedColumns = this.columns.map(c => c.columnDef);
    public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

    accounts:any =[];
    constructor( private service: BankingService) {
        this.service.refresh.subscribe((event)=>{ if(event==='transfer'){ this.fetchAccountDetails(); }});
    }

    ngOnInit(): void {
        this.fetchAccountDetails();
    }

  private fetchAccountDetails() {
    this.accounts=[];
      this.service.getAccountDetails().subscribe(
          (response: any) => {
          if(response.successMsg){
            this.service.accountNumber.next(response.data['accountNumber']);
            this.accounts.push(response.data);
          }
          }
      );
  }
}

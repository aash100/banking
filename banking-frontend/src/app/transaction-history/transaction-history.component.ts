import {Component, OnInit} from '@angular/core';
import {formatDate} from '@angular/common';
import { BankingService } from '../services/banking.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-transaction-history',
    templateUrl: './transaction-history.component.html',
    styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
    transactions: any;
    public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();


    columns = [
      { columnDef: 'id', header: 'Transaction Id' },
      { columnDef: 'sourceAccountNumber',     header: 'Transferred From' },
      { columnDef: 'targetAccountNumber',   header: 'Transferred To'},
      { columnDef: 'amount',   header: 'Amount' },
      { columnDef: 'transactionType',   header: 'Transaction Type' },
      { columnDef: 'transactionDate',   header: 'Transaction Date & Time' },
      
    ];
  
    displayedColumns = this.columns.map(c => c.columnDef);
    noRecordFound: boolean = false;
    constructor(private service: BankingService) {
      this.service.refresh.subscribe(()=>{this.getTransactions();});
    }

    ngOnInit(): void {
      this.getTransactions();
    }

    getTransactions(){
      this.service.getTransactions().subscribe(
      (response: any) => {
            if(response.data && response.data.length>0){
              this.dataSource = new MatTableDataSource(response.data);
            }else{
              this.noRecordFound = true;
            }
          }
      );

    }

  formatDate(date: string | number | Date) {
    return formatDate(date, 'mediumDate', 'en-us', '+530');
  }
}

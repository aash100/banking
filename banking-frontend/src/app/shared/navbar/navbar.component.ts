import {Component, OnInit, ElementRef} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';
import { BankingService } from 'src/app/services/banking.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, map, share, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    private toggleButton: any;
    private sidebarVisible: boolean;
    welcomeTitle='Welcome to Banking';
    name: string = '';

    time = new Date();
    intervalId: any;

    constructor(public location: Location, private element: ElementRef, private router: Router, private service: BankingService, public cookie: CookieService, private snackBar: MatSnackBar) {
        this.sidebarVisible = false;
        this.service.name.subscribe((val:string)=>{
            this.name= val;
            this.welcomeTitle = "Welcome, "+ this.name;
        });

        // this.intervalId = setInterval(() => {
        //     this.time = new Date();
        //   }, 1000);
      
    }

    ngOnInit() {
        // this.welcomeTitle = "Welcome "+ this.name;
        
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
    }


    isLogin() {
        var title = this.location.prepareExternalUrl(this.location.path());
        if (title.charAt(0) === '#') {
            title = title.slice(1);
        }
        if (title === '/login') {
            return true;
        } else {
            return false;
        }
    }

    isRegister() {
        var title = this.location.prepareExternalUrl(this.location.path());
        if (title.charAt(0) === '#') {
            title = title.slice(1);
        }
        if (title === '/register') {
            return true;
        } else {
            return false;
        }
    }


    onLogout() {
        this.cookie.deleteAll();
        this.router.navigate(['/login']);
        this.name = '';
        this.welcomeTitle='Welcome to Banking';
        this.snackBar.open('Logged out successfully','', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'success-snackbar',
            duration:3000
        });
    }
}

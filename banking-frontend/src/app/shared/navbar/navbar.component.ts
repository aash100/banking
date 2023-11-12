import {Component, OnInit, ElementRef} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';
import { BankingService } from 'src/app/services/banking.service';
import { CookieService } from 'ngx-cookie-service';

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

    constructor(public location: Location, private element: ElementRef, private router: Router, private service: BankingService, public cookie: CookieService) {
        this.sidebarVisible = false;
        this.service.name.subscribe((val:string)=>{
            this.name= val;
            this.welcomeTitle = "Welcome "+ this.name + " to Banking";
        })
    }

    ngOnInit() {
        this.welcomeTitle = "Welcome "+ this.name + " to Banking";
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isLogin() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        if (titlee === '/login') {
            return true;
        } else {
            return false;
        }
    }

    isRegister() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        if (titlee === '/register') {
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

    }
}

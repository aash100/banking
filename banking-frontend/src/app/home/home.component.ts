import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, RouterLinkActive, Routes } from '@angular/router';
import { BankingService } from '../services/banking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    // navLinks: any[];
    showSubmenu:boolean=false;
    events: string[] = [];
    opened: boolean = true;
    activeLinkIndex = -1;
    isViewInitialized: any;
    navLinks = [
      { path: '/account', label: 'Check Balance' },
      { path: '/history', label: 'Transaction History' },
      { path: '/transfer', label: 'Transfer Money' },
      { path: '/profile', label: 'User Profile' }
    ];
    activeLink = this.navLinks[0];
    constructor(private router: Router, private service: BankingService){
      // this.navLinks = [
      //   { path: 'account', label: 'Check Balance' },
      //   { path: 'history', label: 'Transaction History' },
      //   { path: 'transfer', label: 'Transfer Money' },
      //   { path: 'profile', label: 'User Profile' }
      // ];
      // this.navLinks = this.buildNavItems(this.router.config);

    }

    ngOnInit(): void {
      // this.router.events.subscribe((res) => {
      //     return this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
      // });
    }
    buildNavItems(routes: Routes) {
      return (routes)
        .filter(route => route.data)
        .map(({ path = '', data }) => ({
          path: path,
          label: data?.['label'],
          icon: data?.['icon']
        }));
    }
    isLinkActive(rla: RouterLinkActive): boolean {
      const routerLink = rla.links.first.urlTree?rla.links.first.urlTree:'';
      
      return this.router.isActive(routerLink, false);
    }

      onTabChanged($event: Event) {
        console.log('$event', $event);
        this.service.refresh.emit('refresh');
      }
}

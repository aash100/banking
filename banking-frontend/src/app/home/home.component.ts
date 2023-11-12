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
    

    constructor(private router: Router, private service: BankingService, private auth: AuthGuardService, private snackBar: MatSnackBar){

    }
  

    ngOnInit(): void {
      this.service.fetchUserDetails().subscribe((response:any)=>{
        console.log(response);
        this.service.name.next(response['name']);
      });

      
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

    selectedTabValue($event: any) {
        if(this.auth.getAuthorizationToken()){
          this.service.refresh.emit('refresh');
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

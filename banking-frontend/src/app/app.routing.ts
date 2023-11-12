import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';


import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuardService } from './guard/login-guard.service';
import { AuthGuardService } from './guard/auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AccountComponent } from './account/account.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'profile', component: UserProfileComponent, },
    {path: 'account', component: AccountComponent, },
    {path: 'transfer', component: TransferMoneyComponent, },
    {path: 'history', component: TransactionHistoryComponent, },
    // {path: '', redirectTo: 'home', pathMatch: 'full'},
    // {path: 'login', component: LoginComponent},
    // {path: 'register', component: RegisterComponent, canActivate: [LoginGuardService]},
    // {path: 'home', component: HomeComponent},
    // {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
    // {path: 'account', component: AccountComponent, canActivate: [AuthGuardService]},
    // {path: 'transfer', component: TransferMoneyComponent, canActivate: [AuthGuardService]},
    // {path: 'history', component: TransactionHistoryComponent, canActivate: [AuthGuardService]},
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            // useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}

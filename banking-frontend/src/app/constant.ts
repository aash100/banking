import { environment } from "src/environments/environment";

export class Constant{
    public static login: string = environment.apiUrl + '/users/login';
    public static registerUser: string = environment.apiUrl + '/users/register';
    public static userDetails: string = environment.apiUrl + '/dashboard/user';

    public static account: string = environment.apiUrl + '/dashboard/account';
    public static transfer: string = environment.apiUrl + '/account/fund-transfer';
    public static deposit: string = environment.apiUrl + '/account/deposit';
    public static withdraw: string = environment.apiUrl + '/account/withdraw';
    public static transactions: string = environment.apiUrl + '/account/transactions';


}
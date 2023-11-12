import { environment } from "src/environments/environment";

export class Constant{
    public static LoginUrl: string = environment.apiUrl + '/users/login';
    public static UserUrl: string = environment.apiUrl + '/users/register';
    public static userDetails: string = environment.apiUrl + '/dashboard/user';

    public static accountUrl: string = environment.apiUrl + '/dashboard/account';
    public static transferUrl: string = environment.apiUrl + '/account/fund-transfer';
    public static depositUrl: string = environment.apiUrl + '/account/deposit';
    public static withdrawUrl: string = environment.apiUrl + '/account/withdraw';
    public static trasactionUrl: string = environment.apiUrl + '/account/transactions';


}
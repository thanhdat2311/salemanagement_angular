import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError, map, Observable, of } from "rxjs";


@Injectable({
    providedIn: `root`
})
export class TokenService{
        private readonly TOKEN_KEY='access_token';
        private jwtHelperSerivce = new JwtHelperService()
        constructor(private http: HttpClient){}
            getToken():string | null {
                return localStorage.getItem(this.TOKEN_KEY);
            }
            setToken(token: string):void{
                localStorage.setItem(this.TOKEN_KEY,token);
            }
            removetoken(): void {
                localStorage.removeItem(this.TOKEN_KEY)
            }
           
            getUserId(){
                let userObject = this.jwtHelperSerivce.decodeToken(this.getToken()?? '');
                return 'userId' in userObject ? parseInt(userObject['userId']):0;
            }  
            isTokenExpired(): boolean {
                if(this.getToken()==null){
                    return false;
                }
                return this.jwtHelperSerivce.isTokenExpired(this.getToken()!);
            }
        
}
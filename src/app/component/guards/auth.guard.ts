import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "src/app/services/token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private tokenService: TokenService, private router: Router){}

    canActivate(next:ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        debugger
        const isTokenExpired = this.tokenService.isTokenExpired();
        const userId = this.tokenService.getUserId();
        debugger
        if(!isTokenExpired && userId){
          return true
        } else {
          this.router.navigate(['/login']);
          return false
        }
    }
    

}

export const AuthGuardFn: CanActivateFn = (next:ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
  debugger
  return inject(AuthGuard).canActivate(next,state)
}
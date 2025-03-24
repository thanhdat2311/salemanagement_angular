import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserResponse } from "src/app/response/user/user.response";
import { TokenService } from "src/app/services/token.service";
import { UserService } from "src/app/services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
  userResponse?: UserResponse | null;
  constructor(private tokenService: TokenService, 
      private router: Router,
      private userService: UserService
  ){}

  canActivate(next:ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      debugger
      const isTokenExpired = this.tokenService.isTokenExpired();
      const userId = this.tokenService.getUserId();
      this.userResponse = this.userService.getUserFromLocalStorage();
      const isValidAdmin = this.userResponse?.role.name == 'ADMIN'
      debugger
      if(!isTokenExpired && userId && isValidAdmin){
        return true
      } else {
        alert("Only Admin!!!🚧")
        this.router.navigate(['/home']);
        return false
      }
  }
    

}

export const AuthGuardFn: CanActivateFn = (next:ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
  debugger
  return inject(AdminGuard).canActivate(next,state)
}
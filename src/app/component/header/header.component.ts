import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/response/user/user.response';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  // Variables for drop down menu
  activeAVTDropdown: boolean = false;
  userResponse?: UserResponse|null|undefined;
  constructor(private tokenService:TokenService,
              private router:Router,
              private userService: UserService
  ){}
  ngOnInit(): void {
    this.userResponse = this.userService.getUserFromLocalStorage();
  }
  // new function
  avtDropdown() {
    if (this.activeAVTDropdown === false) {
      this.activeAVTDropdown = true;
    } else {
      this.activeAVTDropdown = false;
    }
  }

  logOut(){
   this.tokenService.removetoken()
    this.router.navigate(['/login'])
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  activeAVTDropdown: boolean = false;
  constructor(private tokenService:TokenService,
              private router:Router
  ){}
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

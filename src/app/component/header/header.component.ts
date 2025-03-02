import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Variables for drop down menu
  activeAVTDropdown: boolean = false;

  // Variables for active navigation
  activeNav: string = 'home';
  
  ngOnInit(): void {
    const storedIndex = localStorage.getItem('activeNav');
    if (storedIndex) {
      this.activeNav = storedIndex;
    }

  }

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

  setActive(index: string) {
    this.activeNav = index;
    localStorage.setItem('activeNav', index);
  }

  logOut(){
   this.tokenService.removetoken()
    this.router.navigate(['/login'])
  }
}

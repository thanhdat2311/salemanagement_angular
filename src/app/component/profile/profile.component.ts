import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/response/user/user.response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  userResponse?:UserResponse;
  constructor(private userService: UserService){
  }
  ngOnInit(): void {
    this.getMyProfile()
  }
  globe: string = "";
  github: string = "";
  linkedin: string = "";
  instagram: string = "";
  facebook: string = "";

  getMyProfile(){
    this.userResponse = this.userService.getUserFromLocalStorage()
  }
  clearInput(inputContent: 'globe' | 'github' | 'linkedin' | 'instagram' | 'facebook' ) {
    this[inputContent] = "";
  }
}

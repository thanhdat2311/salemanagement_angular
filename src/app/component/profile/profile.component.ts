import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  globe: string = "";
  github: string = "";
  linkedin: string = "";
  instagram: string = "";
  facebook: string = "";


  clearInput(inputContent: 'globe' | 'github' | 'linkedin' | 'instagram' | 'facebook' ) {
    this[inputContent] = "";
  }
}

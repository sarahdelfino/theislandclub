import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private location: Location) {
    console.log(this.location.path());
    this.getPageName();
  }

  title = '';
  menuClicked = false;
  
  navLinks = [
      {
        "title": "Home",
        "link": "/"
      },
      {
        "title": "Membership",
        "link": "/membership"
      },
      {
        "title": "Capital Project",
        "link": "/capital-project"
      },
      // {
      //   "title": "Blog",
      //   "link": "/blog"
      // }
  ]

  getPageName() { 
    for (let link in this.navLinks) {
      if (this.navLinks[link].link === this.location.path()) {
        this.title = this.navLinks[link].title;
      }
    }
  }

}

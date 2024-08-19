import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

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

}

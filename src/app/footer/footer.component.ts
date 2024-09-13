import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  navLinks = [
    {
      "title": "Home",
      "link": "/"
    },
    {
      "title": "Events",
      "link": "/events"
    },
    {
      "title": "Membership",
      "link": "/membership"
    },
    {
      "title": "Capital Project",
      "link": "/capital-project"
    },
    {
      "title": "Blog",
      "link": "/blog"
    }
]

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventsComponent } from '../events/events.component';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, EventsComponent],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent {

  signUpVisible = false;
  requestFormVisible = false;

  toggleSignup() {
    this.requestFormVisible = false;
    this.signUpVisible = !this.signUpVisible;
}

toggleRequest() {
  this.signUpVisible = false;
    this.requestFormVisible = !this.requestFormVisible;
}

}

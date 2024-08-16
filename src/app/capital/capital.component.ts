import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-capital',
  standalone: true,
  imports: [],
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.css'
})
export class CapitalComponent {

  constructor(private firebaseService: FirebaseService) {}

  donations = 0;

  ngOnInit() {
    this.donations = this.firebaseService.getDonationAmount();
  }

}

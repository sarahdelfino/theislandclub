import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-capital',
  standalone: true,
  imports: [],
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.css'
})
export class CapitalComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {

  }

}

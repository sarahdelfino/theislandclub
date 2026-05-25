import { Component, inject } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {

  private readonly firebaseService = inject(FirebaseService);

  readonly featuredEvent$ = this.firebaseService.getFeaturedEvent();


}

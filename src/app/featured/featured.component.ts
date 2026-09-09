import { Component, inject } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {

  private readonly firebaseService = inject(FirebaseService);

  readonly featuredEvent$ = this.firebaseService.getFeaturedEvent();


}

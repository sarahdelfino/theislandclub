import { Component, Input } from '@angular/core';
import { MatChip, MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  @Input({ required: true}) text = '';
  @Input({ required: true}) type = '';
  @Input({ required: false}) custom: boolean = false;

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home-component',
  standalone: true,
  templateUrl: './home.html',
  imports: [
    CommonModule,
  ],
})
export class HomeComponent {
    isRunning = true;

    dateNow = new Date()
}

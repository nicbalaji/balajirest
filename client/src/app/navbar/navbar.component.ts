import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // ✅ Add this

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],       // ✅ Add this
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  title = "Restaurant Finder";
}
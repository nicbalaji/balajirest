import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = "Restaurant Finder";

  showLogin = false;

  openLogin(event: Event) {
    event.preventDefault();
    this.showLogin = true;
  }

  closeLogin() {
    this.showLogin = false;
  }

  login() {
    alert('Login Successful 🎉');
    this.showLogin = false;
  }
}
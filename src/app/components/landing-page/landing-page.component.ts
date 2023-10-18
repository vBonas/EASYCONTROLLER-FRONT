import { Component } from '@angular/core';
import { AuthService } from '../../service/authService';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  authService = new AuthService();
  userLogged: User | null = null;

  constructor() {
    this.userLogged = this.authService.currentUser();
  }

  hasValidUser(): boolean {
    return this.authService.hasUserLoggedIn();
  }


  logout() {
    this.authService.logout();
  }
}

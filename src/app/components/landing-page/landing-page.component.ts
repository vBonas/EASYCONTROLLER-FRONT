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
  loading = true;

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.userLogged = this.authService.currentUser();
      this.loading = false;
    }, 500);
  }

  hasValidUser(): boolean {
    return this.userLogged !== null;
  }

  logout() {
    this.userLogged = null;
    this.authService.logout();
  }
}

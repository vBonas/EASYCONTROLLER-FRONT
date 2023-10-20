import { Component, HostListener } from '@angular/core';
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
  isLargeScreen = window.innerWidth >= 700;
  loading = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isLargeScreen = window.innerWidth >= 700;
  }

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.userLogged = this.authService.currentUser();
      this.loading = false;
    }, 1000);
  }

  hasValidUser(): boolean {
    return this.userLogged !== null;
  }

  logout() {
    this.userLogged = null;
    this.authService.logout();
  }
}

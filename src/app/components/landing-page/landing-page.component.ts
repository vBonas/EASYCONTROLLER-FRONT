import { Component } from '@angular/core';
import { AuthService } from '../../service/authService';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  // constructor(private authService: AuthService) {}
  async loginWithGoogle() {
    try {
      const authService = new AuthService();
      alert('CLICK');
      await authService.loginGoogle();
    } catch (error) {
      alert(error);
    }

    //authService.loginGoogle();
  }

  async createAccount() {
    try {
      const authService = new AuthService();
      alert('CLICK');
      await authService.createAccount('teste@gmail.com', '123123');
    } catch (error) {
      alert(error);
    }

    //authService.loginGoogle();
  }
}

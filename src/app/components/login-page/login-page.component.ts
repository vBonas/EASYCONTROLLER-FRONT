import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../service/authService';
import { User } from 'firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  isLargeScreen = window.innerWidth >= 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isLargeScreen = window.innerWidth >= 768;
  }
  email: string = '';
  senha: string = '';

  authService = new AuthService();
  userLogged: User | null = null;

  constructor(private snackBar: MatSnackBar) {
    this.userLogged = this.authService.currentUser();
  }

  hasValidUser(): boolean {
    return this.authService.hasUserLoggedIn();
  }

  async loginWithGoogle() {
    try {
      alert('CLICK');
      await this.authService.loginGoogle();
    } catch (error) {
      alert(error);
    }
  }

  async createAccount() {
    try {
      alert('CLICK');
      await this.authService.createAccount('teste@gmail.com', '123123');
    } catch (error) {
      alert(error);
    }
  }

  loginWithEmail() {
    if (this.email === '' || this.senha === '') {
      this.showMessageError('Preencha todos os campos');

      return;
    }
    this.authService.loginWithEmail(this.email, this.senha);
  }

  focusNext(nextElementId: string) {
    const nextElement = document.querySelector(
      `#${nextElementId}`
    ) as HTMLElement | null;
    if (nextElement) {
      nextElement.focus();
    }
  }

  showMessageError(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['red-snackbar'],
      politeness: 'assertive',
    });
  }

  showMessageSuccess(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['green-snackbar'],
      politeness: 'assertive',
    });
  }
}

import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../service/authService';
import { User } from 'firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  isLargeScreen = window.innerWidth >= 768;
  loading = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isLargeScreen = window.innerWidth >= 768;
  }
  email: string = '';
  senha: string = '';

  authService: AuthService = new AuthService();
  userLogged: User | null = null;

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.hasValidUser();
    }, 500);
  }

  hasValidUser() {
    const hasUser: boolean = this.authService.hasUserLoggedIn();

    if (hasUser) {
      this.router.navigate(['']);
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginGoogle();
    } catch (error) {
      alert(error);
    }
  }


  async loginWithEmail() {
    if (this.email === '' || this.senha === '') {
      this.showMessageError('Preencha todos os campos');
      return;
    }
    const status = await this.authService.loginWithEmail(
      this.email,
      this.senha
    );
    if (status) {
      this.showMessageSuccess('Parabéns, você está logado!');
      this.router.navigate(['']);
    } else {
      this.showMessageError('Usuário ou senha inválidos');
    }
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

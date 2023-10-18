import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../service/authService';
import { User } from 'firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  isLargeScreen = window.innerWidth >= 768;
  loading = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isLargeScreen = window.innerWidth >= 768;
  }
  email: string = 'teste@gmail.com';
  senha: string = '123123';
  confirmSenha: string = '123123';

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

  async createAccount() {
    try {
      if (this.email === '' || this.senha === '' || this.confirmSenha === '') {
        this.showMessageError('Preencha todos os campos');
        return;
      }
      if (this.senha !== this.confirmSenha) {
        this.showMessageError('Senhas não conferem');
        return;
      }
      const status = await this.authService.createAccount(
        this.email,
        this.senha
      );
      if (status) {
        this.showMessageSuccess('Usuário criado com sucesso!');
        this.router.navigate(['']);
      } else {
        this.showMessageError('Erro ao criar usuário, tente outro email!');
      }
    } catch (error) {
      alert(error);
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

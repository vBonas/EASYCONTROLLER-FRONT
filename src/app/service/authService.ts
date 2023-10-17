import { appFirebase } from '../environments/env';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

export class AuthService {
  auth = getAuth(appFirebase);
  provider = new GoogleAuthProvider();

  async loginWithEmail(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert('Usuário logado com sucesso!');
        // ...
      })
      .catch((error) => {
        alert(
          `Erro ao criar usuário: ${error} - ${error.code} - ${error.message}`
        );
      });
  }

  //login com google
  async loginGoogle() {
    const auth = getAuth();
    GoogleAuthProvider.credential(
      '331210894297-89shkt024jihddfc3dkhmdtqk0adp4i3.apps.googleusercontent.com',
      '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'
    );
    signInWithPopup(auth, this.provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential === null) {
          alert('Erro ao logar com Google');
          return;
        }

        const token = credential.accessToken;
        const user = result.user;
        alert('Usuário logado com sucesso!');
      })
      .catch((error) => {
        alert(`Erro ao logar com Google: ${error}`);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  async logout() {
    await this.auth.signOut();
  }

  async createAccount(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert('Usuário criado com sucesso!');
        // ...
      })
      .catch((error) => {
        alert(
          `Erro ao criar usuário: ${error} - ${error.code} - ${error.message}`
        );
      });
  }
}

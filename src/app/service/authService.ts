import { appFirebase } from '../environments/env';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';

export class AuthService {
  auth = getAuth(appFirebase);
  provider = new GoogleAuthProvider();

  currentUser(): User | null {
    const user = this.auth.currentUser;
    return user;
  }

  hasUserLoggedIn(): boolean {
    const user = this.auth.currentUser;
    return user !== null;
  }

  async loginWithEmail(email: string, password: string): Promise<boolean> {
    let status = false;
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;

        if (userCredential === null) {
          status = false;
          return;
        }
        status = true;
      })
      .catch((error) => {
        console.log(
          `Erro ao criar usuário: ${error} - ${error.code} - ${error.message}`
        );
        status = false;
      });
    return status;
  }

  async loginGoogle(): Promise<boolean> {
    const auth = getAuth();
    let status = false;

    GoogleAuthProvider.credential(
      '331210894297-89shkt024jihddfc3dkhmdtqk0adp4i3.apps.googleusercontent.com',
      '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'
    );
    await signInWithPopup(auth, this.provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential === null) {
          status = false;
          return;
        }

        const token = credential.accessToken;
        const user = result.user;
        status = true;
      })
      .catch((error) => {
        console.log(`Erro ao logar com Google: ${error}`);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    return status;
  }

  async logout() {
    await this.auth.signOut();
  }

  async createAccount(email: string, password: string): Promise<boolean> {
    const auth = getAuth();
    let status = false;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //const user = userCredential.user;
        status = true;
      })
      .catch((error) => {
        console.log(
          `Erro ao criar usuário: ${error} - ${error.code} - ${error.message}`
        );
      });
    return status;
  }
}

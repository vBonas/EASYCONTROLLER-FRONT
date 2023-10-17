// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private afAuth: AngularFireAuth, private router: Router) {}

//   login(email: string, password: string) {
//     this.afAuth
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         this.router.navigate(['/home']);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   logout() {
//     this.afAuth
//       .signOut()
//       .then(() => {
//         this.router.navigate(['/login']);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
// }

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCB8_TZlSYRHXTtj9oubzy8N1Ot3ovqWEY',
  authDomain: 'teste-285200.firebaseapp.com',
  projectId: 'teste-285200',
  storageBucket: 'teste-285200.appspot.com',
  messagingSenderId: '331210894297',
  appId: '1:331210894297:web:8e03d9a32ef70059d587c8',
  measurementId: 'G-DKNENZRCHV',
};

const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export { appFirebase, analytics };

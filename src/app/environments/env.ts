// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCqaeTKoa47OVvg3VHyGecHRZrwrjKPxW8',
  authDomain: 'easy--controller.firebaseapp.com',
  projectId: 'easy--controller',
  storageBucket: 'easy--controller.appspot.com',
  messagingSenderId: '22229449638',
  appId: '1:22229449638:web:6200a35d602a5c69dfad67',
  measurementId: 'G-PT5B9FTFJL',
};

const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export { appFirebase, analytics };

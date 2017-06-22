import firebaseConfig from './firebase';

export const environment = {
  production: true,
  firebase: {
    ...firebaseConfig,
    authDomain: 'diary-app-1fa1b.firebaseapp.com'
  }
};

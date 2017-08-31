import { defaultConfig } from './common/default-config';
import { firebaseConfig } from './common/firebase-config';

export const environment = {
  ...defaultConfig,
  production: true,
  firebase: firebaseConfig,
};

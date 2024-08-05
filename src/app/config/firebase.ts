import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCxEnUVKQCRq-PxmmKtKw3Ufs2JaH54Hxg',
  authDomain: 'database-comics-2e6d3.firebaseapp.com',
  projectId: 'database-comics-2e6d3',
  storageBucket: 'database-comics-2e6d3.appspot.com',
  messagingSenderId: '286426965423',
  appId: '1:286426965423:web:8575c405e1167ef4cdfb5a',
  measurementId: 'G-EEVW3CJJBK',
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
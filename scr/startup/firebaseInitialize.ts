import { initializeApp } from 'firebase/app';

import firebaseConfig from '../config/firebaseConfig';

const firebaseInitialize = () => {
    // Initialize Firebase
    initializeApp(firebaseConfig);
};

export default firebaseInitialize;

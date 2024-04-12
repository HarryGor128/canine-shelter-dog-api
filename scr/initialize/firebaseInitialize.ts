import { initializeApp } from 'firebase/app';

import firebaseConfig from '../config/firebaseConfig';

const firebaseInitialize = () => {
    // Initialize Firebase
    const initialize = initializeApp(firebaseConfig);
    console.log(
        '🚀 ~ file: firebaseInitialize.ts:8 ~ firebaseInitialize ~ initialize:',
        initialize,
    );
};

export default firebaseInitialize;

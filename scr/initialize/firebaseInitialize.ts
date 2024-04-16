import { initializeApp } from 'firebase/app';

import firebaseConfig from '../config/firebaseConfig';
import { getFirestore as getStore } from 'firebase/firestore';

const firebaseInitialize = () => {
    // Initialize Firebase
    const initialize = initializeApp(firebaseConfig);
    console.log(
        '🚀 ~ file: firebaseInitialize.ts:8 ~ firebaseInitialize ~ initialize:',
        initialize,
    );
    const getFirestore = getStore(initialize);

    return { getFirestore };
};

export default firebaseInitialize;

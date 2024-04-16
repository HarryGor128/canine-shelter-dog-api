import { initializeApp } from 'firebase/app';

import firebaseConfig from '../config/firebaseConfig';
import { collection, doc, getFirestore } from 'firebase/firestore';
import CollectionPath from '../const/CollectionPath';
import { getAuth } from 'firebase/auth';

const firebaseInitialize = () => {
    // Initialize Firebase
    const initialize = initializeApp(firebaseConfig);
    console.log(
        '🚀 ~ file: firebaseInitialize.ts:8 ~ firebaseInitialize ~ initialize:',
        initialize,
    );
    const db = getFirestore(initialize);

    const docRef = async (collectionPath: CollectionPath, docId: string) => {
        const docRef = await doc(db, collectionPath, docId);
        return docRef;
    };

    const collectionRef = async (collectionPath: CollectionPath) => {
        const collectionRef = await collection(db, collectionPath);
        return collectionRef;
    };

    const authRef = async () => {
        const authRef = await getAuth(initialize);
        return authRef;
    };

    return { docRef, collectionRef, authRef };
};

export default firebaseInitialize;

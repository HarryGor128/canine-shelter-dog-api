import CollectionPath from '../const/CollectionPath';

import {
    collection,
    DocumentData,
    getDoc,
    getDocs,
    doc,
    setDoc,
} from 'firebase/firestore';
import firebaseInitialize from '../initialize/firebaseInitialize';

const firebase = firebaseInitialize();

const firebaseServices = {
    async getDoc(
        collectionPath: CollectionPath,
        docId: string,
    ): Promise<DocumentData> {
        const docRef = await doc(firebase.getFirestore, collectionPath, docId);
        const docSnapshot = await getDoc(docRef);
        const data = docSnapshot.data();
        console.log('🚀 ~ file: firebaseServices.ts:23 ~ getDoc ~ data:', data);

        return data;
    },
    async getCollection(
        collectionPath: CollectionPath,
    ): Promise<DocumentData[]> {
        const collectionRef = await collection(
            firebase.getFirestore,
            collectionPath,
        );
        const collectionSnapshot = await getDocs(collectionRef);
        const dataList = collectionSnapshot.docs.map((doc) => doc.data());
        console.log(
            '🚀 ~ file: firebaseServices.ts:16 ~ getCollection ~ dataList:',
            dataList,
        );

        return dataList;
    },
    async addDoc(collectionPath: CollectionPath, docId: string, addObj: any) {
        const docRef = await doc(firebase.getFirestore, collectionPath, docId);
        const docSnapshot = await setDoc(docRef, addObj);
        console.log(
            '🚀 ~ file: firebaseServices.ts:54 ~ addDoc ~ docSnapshot:',
            docSnapshot,
        );

        return docSnapshot;
    },
    async updateDoc(
        collectionPath: CollectionPath,
        docId: string,
        updateObj: any,
    ) {},
    async deleteDoc(collectionPath: CollectionPath, docId: string) {},
    async downloadFile(remoteFilePath: string) {},
    async uploadFile(remoteFilePath: string, filePath: string) {},
};

export default firebaseServices;

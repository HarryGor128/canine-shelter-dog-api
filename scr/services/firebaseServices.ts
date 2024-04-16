import CollectionPath from '../const/CollectionPath';

import {
    collection,
    DocumentData,
    getDoc,
    getDocs,
    doc,
} from 'firebase/firestore';
import firebaseInitialize from '../initialize/firebaseInitialize';

const firebase = firebaseInitialize();

const firebaseServices = {
    async getDoc(
        collectionPath: CollectionPath,
        docId: string,
    ): Promise<DocumentData> {
        const collectionRef = await doc(
            firebase.getFirestore,
            collectionPath,
            docId,
        );
        const collectionSnapshot = await getDoc(collectionRef);
        const data = collectionSnapshot.data();
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
    addDoc(collectionPath: CollectionPath, addObj: any) {},
    updateDoc(collectionPath: CollectionPath, docId: string, updateObj: any) {},
    deleteDoc(collectionPath: CollectionPath, docId: string) {},
    downloadFile(remoteFilePath: string) {},
    uploadFile(remoteFilePath: string, filePath: string) {},
};

export default firebaseServices;
